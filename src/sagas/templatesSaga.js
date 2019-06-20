import { TemplateLibrary, Template } from '@accordproject/cicero-core';
import { version as ciceroVersion } from '@accordproject/cicero-core/package.json';
import PluginManager from '@accordproject/markdown-editor/dist/PluginManager';
import ListPlugin from '@accordproject/markdown-editor/dist/plugins/list';
import FromMarkdown from '@accordproject/markdown-editor/dist/markdown/fromMarkdown';
import ToMarkdown from '@accordproject/markdown-editor/dist/markdown/toMarkdown';
import ClausePlugin from '@accordproject/cicero-ui/dist/plugins/ClausePlugin';
import { Value } from 'slate';

import {
  takeLatest, put, select, takeEvery, call
} from 'redux-saga/effects';

import * as actions from '../actions/templatesActions';
import * as appActions from '../actions/appActions';
import * as contractActions from '../actions/contractActions';
import * as selectors from '../selectors/templatesSelectors';
import * as contractSelectors from '../selectors/contractSelectors';


/**
 * saga to populate store with templates
 */
export function* pushTemplatesToStore() {
  try {
    const templateLibrary = new TemplateLibrary();
    const templateIndex = yield templateLibrary
      .getTemplateIndex({ latestVersion: false, ciceroVersion });
    const templateIndexArray = Object.values(templateIndex);
    yield put(actions.getTemplatesSuccess(templateIndexArray));
  } catch (err) {
    yield put(appActions.addAppError('Failed to load templates', err));
  }
}

/**
 * saga which puts a mock template onto the array
 * of templates in the store
 */
export function* addNewTemplateToStore() {
  const newTemplate = {
    uri: `${Date.now()}`,
    name: 'Temporary New Template',
    version: '1.0.0',
    description: 'This is mock data to showcase an action to add a new template.',
  };
  yield put(actions.addNewTemplateSuccess(newTemplate));
}

/**
 * saga which checks if template is in the store
 * and loads the template if it is not
 */
export function* addTemplateObjectToStore(action) {
  const templateObjects = yield select(selectors.templateObjects);

  if (!templateObjects || !templateObjects[action.uri]) {
    try {
      const templateObj = yield Template.fromUrl(action.uri);
      yield put(actions.loadTemplateObjectSuccess(action.uri, templateObj));
      return templateObj;
    } catch (err) {
      yield put(appActions.addAppError('Failed to load template object', err));
      return err;
    }
  }

  return templateObjects[action.uri];
}

/**
 * saga which adds a clause node to the current slate value
 */
export function* addToContract(action) {
  const pluginManager = new PluginManager([ListPlugin(), ClausePlugin()]);
  const fromMarkdown = new FromMarkdown(pluginManager);
  const toMarkdown = new ToMarkdown(pluginManager);

  const templateObj = yield call(addTemplateObjectToStore, action);

  const slateValue = yield select(contractSelectors.slateValue);
  const { metadata } = templateObj;

  const clauseMd = `
    
  <clause src=${action.uri} id='placeholder'>
    ${metadata.getSample()}
    </clause>`;
  const value = fromMarkdown.convert(clauseMd);
  const clauseNode = value.toJSON().document.nodes[0];

  const newSlateValue = JSON.parse(JSON.stringify(slateValue.toJSON()));
  const newMd = toMarkdown.convert(newSlateValue);
  const { nodes } = newSlateValue.document;
  nodes.push(clauseNode);
  yield put(contractActions.documentEdited(Value.fromJSON(newSlateValue), newMd));
}

export const templatesSaga = [
  takeLatest('GET_AP_TEMPLATES', pushTemplatesToStore),
  takeLatest('ADD_NEW_TEMPLATE', addNewTemplateToStore),
  takeEvery('LOAD_TEMPLATE_OBJECT', addTemplateObjectToStore),
  takeEvery('ADD_TO_CONTRACT', addToContract)
];

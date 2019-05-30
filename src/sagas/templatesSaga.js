import { TemplateLibrary, Template } from '@accordproject/cicero-core';
import { version as ciceroVersion } from '@accordproject/cicero-core/package.json';

import {
  takeLatest, put, select, takeEvery, call
} from 'redux-saga/effects';
import * as actions from '../actions/templatesActions';
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
    yield put(actions.getTemplatesError(err));
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
      yield put(actions.loadTemplateObjectError(err));
      return err;
    }
  }

  return templateObjects[action.uri];
}

/**
 * saga which calls the markdown changed action
 * with the updated markdown including a clause
 */
export function* addToContract(action) {
  const templateObj = yield call(addTemplateObjectToStore, action);
  let markdown = yield select(contractSelectors.markdown);
  try {
    const sampleText = templateObj.metadata.samples.default;
    markdown += `
    
<clause src=${action.uri} id='aj47ggksff6538wjg'>
  ${sampleText}
  </clause>`;
    yield put(contractActions.clauseAdded(markdown));
  } catch (err) {
    console.log('error? ', err);
  }
}

export const templatesSaga = [
  takeLatest('GET_AP_TEMPLATES', pushTemplatesToStore),
  takeLatest('ADD_NEW_TEMPLATE', addNewTemplateToStore),
  takeEvery('LOAD_TEMPLATE_OBJECT', addTemplateObjectToStore),
  takeEvery('ADD_TO_CONTRACT', addToContract)
];

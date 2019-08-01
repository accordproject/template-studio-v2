import { TemplateLibrary, Template } from '@accordproject/cicero-core';
import { version as ciceroVersion } from '@accordproject/cicero-core/package.json';

import {
  takeLatest, put, select, takeEvery
} from 'redux-saga/effects';

import * as actions from '../actions/templatesActions';
import * as appActions from '../actions/appActions';
import * as selectors from '../selectors/templatesSelectors';
import {
  ADD_NEW_TEMPLATE,
  GET_AP_TEMPLATES,
  LOAD_TEMPLATE_OBJECT,
} from '../actions/constants';

/**
 * saga to populate store with templates
 */
export function* pushTemplatesToStore() {
  try {
    const templateLibrary = new TemplateLibrary();
    const templateIndex = yield templateLibrary
      .getTemplateIndex({ latestVersion: true, ciceroVersion });
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

export const templatesSaga = [
  takeLatest(GET_AP_TEMPLATES, pushTemplatesToStore),
  takeLatest(ADD_NEW_TEMPLATE, addNewTemplateToStore),
  takeEvery(LOAD_TEMPLATE_OBJECT, addTemplateObjectToStore),
];

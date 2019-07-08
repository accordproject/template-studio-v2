import {
  ADD_NEW_TEMPLATE,
  ADD_NEW_TEMPLATE_SUCCEEDED,
  GET_AP_TEMPLATES,
  GET_AP_TEMPLATES_SUCEEDED,
  LOAD_TEMPLATE_OBJECT,
  LOAD_TEMPLATE_OBJECT_SUCCEEDED,
} from './constants';

export const getTemplatesAction = () => ({
  type: GET_AP_TEMPLATES,
});

export const getTemplatesSuccess = templateIndexArray => ({
  type: GET_AP_TEMPLATES_SUCEEDED,
  templates: templateIndexArray,
});

export const addNewTemplateAction = () => ({
  type: ADD_NEW_TEMPLATE,
});

export const addNewTemplateSuccess = template => ({
  type: ADD_NEW_TEMPLATE_SUCCEEDED,
  template,
});

export const loadTemplateObjectAction = uri => ({
  type: LOAD_TEMPLATE_OBJECT,
  uri,
});

export const loadTemplateObjectSuccess = (uri, templateObj) => ({
  type: LOAD_TEMPLATE_OBJECT_SUCCEEDED,
  uri,
  templateObj,
});

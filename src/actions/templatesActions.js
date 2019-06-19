export const getTemplatesAction = () => ({
  type: 'GET_AP_TEMPLATES',
});

export const getTemplatesSuccess = templateIndexArray => ({
  type: 'GET_AP_TEMPLATES_SUCEEDED',
  templates: templateIndexArray,
});

export const getTemplatesError = error => ({
  type: 'AP_TEMPLATES_ERROR',
  error,
});

export const addNewTemplateAction = () => ({
  type: 'ADD_NEW_TEMPLATE',
});

export const addNewTemplateSuccess = template => ({
  type: 'ADD_NEW_TEMPLATE_SUCCEEDED',
  template,
});

export const loadTemplateObjectAction = uri => ({
  type: 'LOAD_TEMPLATE_OBJECT',
  uri,
});

export const loadTemplateObjectSuccess = (uri, templateObj) => ({
  type: 'LOAD_TEMPLATE_OBJECT_SUCCEEDED',
  uri,
  templateObj,
});

export const loadTemplateObjectError = error => ({
  type: 'LOAD_TEMPLATE_OBJECT_ERROR',
  error
});

export const addToContractAction = uri => ({
  type: 'ADD_TO_CONTRACT',
  uri,
});

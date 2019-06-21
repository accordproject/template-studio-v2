const initialState = {
  templatesAP: [],
  templateObjs: {},
};

const GET_AP_TEMPLATES_SUCEEDED = 'GET_AP_TEMPLATES_SUCEEDED';
const ADD_NEW_TEMPLATE_SUCCEEDED = 'ADD_NEW_TEMPLATE_SUCCEEDED';
const LOAD_TEMPLATE_OBJECT_SUCCEEDED = 'LOAD_TEMPLATE_OBJECT_SUCCEEDED';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AP_TEMPLATES_SUCEEDED:
      return { ...state, templatesAP: action.templates };
    case ADD_NEW_TEMPLATE_SUCCEEDED:
      return { ...state, templatesAP: [...state.templatesAP, action.template] };
    case LOAD_TEMPLATE_OBJECT_SUCCEEDED:
      return {
        ...state,
        templateObjs: { ...state.templateObjs, [action.uri]: action.templateObj }
      };
    default:
      return state;
  }
};

export default reducer;

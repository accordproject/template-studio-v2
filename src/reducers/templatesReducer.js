import {
  ADD_NEW_TEMPLATE_SUCCEEDED,
  GET_AP_TEMPLATES_SUCEEDED,
  LOAD_TEMPLATE_OBJECT_SUCCEEDED,
} from '../actions/constants';

const initialState = {
  templatesAP: [],
  templateObjs: {},
};

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

const initialState = {
  templatesAP: [],
  error: null,
};

const AP_TEMPLATES_RECEIVED = 'AP_TEMPLATES_RECEIVED';
const AP_TEMPLATES_ERROR = 'AP_TEMPLATES_ERROR';
const ADD_NEW_TEMPLATE_SUCCEEDED = 'ADD_NEW_TEMPLATE_SUCCEEDED';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AP_TEMPLATES_RECEIVED:
      return { ...state, templatesAP: action.templates };
    case ADD_NEW_TEMPLATE_SUCCEEDED:
      return { ...state, templatesAP: [...state.templatesAP, action.template] };
    case AP_TEMPLATES_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;

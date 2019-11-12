import {
  ADD_APP_ERROR,
  REMOVE_APP_ERROR,
  SET_CURRENT_EDITOR,
  TOGGLE_WELCOME,
  CHANGE_WELCOME_SEARCH_VALUE,
  CHANGE_WELCOME_SEARCH_RESULTS,
  TOGGLE_WELCOME_SEARCH_LOADING,
} from '../actions/constants';



const initialState = {
  error: null,
  id: null,
  editor: 'contract',
  welcome: {
    toggle: true,
    searchValue: '',
    results: [],
    isLoading: false,
  }
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APP_ERROR:
      return { ...state, error: action.error };
    case REMOVE_APP_ERROR:
      return { ...state, error: null };
    case SET_CURRENT_EDITOR:
      return {
        ...state,
        id: action.id,
        editor: action.editor,
      };
    case TOGGLE_WELCOME:
      return {
        ...state,
        welcome: {
          ...state.welcome,
          toggle: action.toggle
        },
      };
    case CHANGE_WELCOME_SEARCH_VALUE:
      return {
        ...state,
        welcome: {
          ...state.welcome,
          searchValue: action.value
        },
      };
    case CHANGE_WELCOME_SEARCH_RESULTS:
      return {
        ...state,
        welcome: {
          ...state.welcome,
          results: action.results
        },
      };
    case TOGGLE_WELCOME_SEARCH_LOADING:
      return {
        ...state,
        welcome: {
          ...state.welcome,
          isLoading: action.isLoading
        },
      };
    default:
      return state;
  }
};

export default reducer;

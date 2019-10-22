import {
  ADD_APP_ERROR,
  REMOVE_APP_ERROR,
  SET_CURRENT_EDITOR,
  TOGGLE_WELCOME_SCREEN,
} from '../actions/constants';

const initialState = {
  error: null,
  id: null,
  editor: 'contract',
  welcomeScreen: true,
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
    case TOGGLE_WELCOME_SCREEN:
      return {
        ...state,
        welcomeScreen: action.toggle,
      }
    default:
      return state;
  }
};

export default reducer;

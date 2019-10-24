import { TOGGLE_WELCOME, ADD_APP_ERROR, REMOVE_APP_ERROR, SET_CURRENT_EDITOR, CHANGE_WELCOME_SEARCH } from './constants';

export const addAppError = (errorDescription, error) => ({
  type: ADD_APP_ERROR,
  error: {
    errorDescription,
    errorName: error.name,
    errorMessage: error.message,
  }
});

export const toggleWelcome = (toggle) => ({
  type: TOGGLE_WELCOME,
  toggle,
});

export const changeWelcomeSearch = (value) => ({
  type: CHANGE_WELCOME_SEARCH,
  value,
})

export const removeAppError = () => ({
  type: REMOVE_APP_ERROR,
});

export const setCurrentEditorAction = (id, editor) => ({
  type: SET_CURRENT_EDITOR,
  id,
  editor,
});

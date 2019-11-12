import { 
  TOGGLE_WELCOME, 
  ADD_APP_ERROR, 
  REMOVE_APP_ERROR, 
  SET_CURRENT_EDITOR, 
  CHANGE_WELCOME_SEARCH_VALUE,  
  CHANGE_WELCOME_SEARCH_RESULTS,
  TOGGLE_WELCOME_SEARCH_LOADING
} from './constants';

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

export const changeWelcomeSearchValue = (value) => ({
  type: CHANGE_WELCOME_SEARCH_VALUE,
  value,
})

export const changeWelcomeSearchResults = (results) => ({
  type: CHANGE_WELCOME_SEARCH_RESULTS,
  results,
})

export const toggleWelcomeSearchLoading = (isLoading) => ({
  type: TOGGLE_WELCOME_SEARCH_LOADING,
  isLoading,
})
export const removeAppError = () => ({
  type: REMOVE_APP_ERROR,
});

export const setCurrentEditorAction = (id, editor) => ({
  type: SET_CURRENT_EDITOR,
  id,
  editor,
});

export const addAppError = (errorDescription, error) => ({
  type: 'ADD_APP_ERROR',
  error: {
    errorDescription,
    errorName: error.name,
    errorMessage: error.message,
  }
});

export const removeAppError = () => ({
  type: 'REMOVE_APP_ERROR',
});

export const setCurrentEditorAction = (id, editor) => ({
  type: 'SET_CURRENT_EDITOR',
  id,
  editor,
});

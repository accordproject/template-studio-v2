const initialState = {
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_APP_ERROR':
      return { ...state, error: action.error };
    case 'REMOVE_APP_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export default reducer;

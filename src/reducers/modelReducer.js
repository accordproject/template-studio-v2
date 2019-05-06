const initialState = {
  model: '',
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_MODEL_MOCK_SUCCEEDED':
      return { ...state, model: action.model };
    default:
      return state;
  }
};

export default reducer;

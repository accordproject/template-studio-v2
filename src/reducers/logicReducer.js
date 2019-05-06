const initialState = {
  logic: '',
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIC_MOCK_SUCCEEDED':
      return { ...state, logic: action.logic };
    default:
      return state;
  }
};

export default reducer;

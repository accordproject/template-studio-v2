const initialState = {
  sample: '',
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SAMPLE_MOCK_SUCCEEDED':
      return { ...state, sample: action.sample };
    default:
      return state;
  }
};

export default reducer;

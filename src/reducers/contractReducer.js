const initialState = {
  markdown: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MARKDOWN_CHANGED':
      return {
        ...state,
        markdown: action.markdown,
      };
    default:
      return state;
  }
};

export default reducer;

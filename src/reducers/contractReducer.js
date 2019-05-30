const initialState = {
  markdown: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MARKDOWN_CHANGED_SUCCESS':
      return {
        ...state,
        markdown: action.markdown,
      };
    case 'CLAUSE_ADDED_SUCCESS':
      return {
        ...state,
        markdown: action.markdown,
      };
    default:
      return state;
  }
};

export default reducer;

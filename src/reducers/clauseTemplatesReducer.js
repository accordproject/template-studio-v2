const initialState = {
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CLAUSE_TEMPLATE':
      return {
        ...state,
        [action.clauseTemplate.id]: action.clauseTemplate,
      };
    default:
      return state;
  }
};

export default reducer;

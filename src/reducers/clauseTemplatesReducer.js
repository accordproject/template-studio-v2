const initialState = {
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CLAUSE_TEMPLATE':
      return {
        ...state,
        [action.clauseTemplate.id]: action.clauseTemplate,
      };
    case 'EDIT_CLAUSE_GRAMMAR':
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          grammar: action.grammar,
        }
      };
    case 'EDIT_CLAUSE_SAMPLE':
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          sampleText: action.sample,
        }
      };
    default:
      return state;
  }
};

export default reducer;

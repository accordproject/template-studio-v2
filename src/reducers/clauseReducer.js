const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PARSE_CLAUSE_SUCEEDED':
      return {
        ...state,
        [action.clauseId]: {
          error: null,
          parseResult: action.parseResult
        }
      };
    case 'PARSE_CLAUSE_ERROR':
      return {
        ...state,
        [action.clauseId]: {
          ...state[action.clauseId],
          error: action.error,
        }
      };
    default:
      return state;
  }
};

export default reducer;

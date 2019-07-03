const initialState = {};

const reducer = (state = initialState, action) => {
  let newModel;
  if (action.type === 'EDIT_CLAUSE_MODEL') {
    const { model } = state[action.clauseTemplateId];
    newModel = model.map((file) => {
      if (file.name === action.fileName) {
        return {
          name: file.name,
          content: action.content
        };
      }
      return file;
    });
  }
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
    case 'EDIT_CLAUSE_LOGIC':
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          logic: action.logic,
        }
      };
    case 'EDIT_CLAUSE_MODEL':
      console.log('NEW MOD', newModel);
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          model: newModel,
        }
      };
    default:
      return state;
  }
};

export default reducer;

import * as R from 'ramda';
import {
  ADD_CLAUSE_TEMPLATE,
  REMOVE_CLAUSE_TEMPLATE,
  EDIT_CLAUSE_GRAMMAR,
  EDIT_CLAUSE_LOGIC,
  EDIT_CLAUSE_MODEL_SUCCESS,
  EDIT_CLAUSE_PACKAGE_JSON,
  EDIT_CLAUSE_SAMPLE
} from '../actions/constants';

const initialState = {};

const reducer = (state = initialState, action) => {
  let newModel;
  if (action.type === EDIT_CLAUSE_MODEL_SUCCESS) {
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
  let newLogic;
  if (action.type === EDIT_CLAUSE_LOGIC) {
    const { logic } = state[action.clauseTemplateId];
    newLogic = logic.map((file) => {
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
    case ADD_CLAUSE_TEMPLATE:
      return {
        ...state,
        [action.clauseTemplate.id]: action.clauseTemplate,
      };
    case REMOVE_CLAUSE_TEMPLATE:
      return R.omit(
        (R.slice(0, 1, Object.entries(state).find(
          ([key, value]) => (value.clauseId === action.clauseId)
        ) || []) || []),
        state
      );
    case EDIT_CLAUSE_GRAMMAR:
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          grammar: action.grammar,
        }
      };
    case EDIT_CLAUSE_SAMPLE:
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          sampleText: action.sample,
        }
      };
    case EDIT_CLAUSE_LOGIC:
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          logic: newLogic,
        }
      };
    case EDIT_CLAUSE_MODEL_SUCCESS:
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          model: newModel,
        }
      };
    case EDIT_CLAUSE_PACKAGE_JSON:
      return {
        ...state,
        [action.clauseTemplateId]: {
          ...state[action.clauseTemplateId],
          metadata: {
            ...state[action.clauseTemplateId].metadata,
            packageJson: action.packageJson,
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;

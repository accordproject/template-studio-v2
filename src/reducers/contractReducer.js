import { Value } from 'slate';
import * as R from 'ramda';
import {
  ADD_TO_CONTRACT_SUCCESS,
  DOCUMENT_EDITED_SUCCESS,
  PARSE_CLAUSE_ERROR,
  PARSE_CLAUSE_SUCEEDED,
  PASTE_TO_CONTRACT_SUCCESS,
  REMOVE_CLAUSE_FROM_CONTRACT,
} from '../actions/constants';

const initialState = {
  contractTemplateRef: null,
  markdown: '',
  slateValue: Value.fromJSON({
    object: 'value',
    document: {
      object: 'document',
      data: {},
      nodes: [{
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Welcome to Template Studio! Edit this text to get started.',
          marks: []
        }],
      }],
    }
  }),
  clauses: {},
  headers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_EDITED_SUCCESS: {
      return {
        ...state,
        markdown: action.markdown,
        slateValue: action.slateValue,
        headers: action.headers
      };
    }
    case ADD_TO_CONTRACT_SUCCESS: {
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            parseError: null,
            parseResult: null,
            clauseTemplateRef: action.clauseTemplateRef,
          }
        }
      };
    }
    case PARSE_CLAUSE_SUCEEDED: {
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            ...state.clauses[action.clauseId],
            parseError: null,
            parseResult: action.parseResult
          }
        }
      };
    }
    case PARSE_CLAUSE_ERROR: {
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            ...state.clauses[action.clauseId],
            parseError: action.error,
            // would we rather the below be that last good result (if there is one)?
            parseResult: null,
          }
        }
      };
    }
    case PASTE_TO_CONTRACT_SUCCESS: {
      return {
        ...state,
        clauses: {
          ...state.clauses,
          [action.clauseId]: {
            parseError: null,
            parseResult: null,
            clauseTemplateRef: action.clauseTemplateRef,
          }
        }
      };
    }
    case REMOVE_CLAUSE_FROM_CONTRACT: {
      const filteredClauses = R.omit([action.clauseId], state.clauses);
      return {
        ...state,
        clauses: {
          ...filteredClauses
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

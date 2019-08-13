import { Value } from 'slate';
import * as R from 'ramda';
import {
  ADD_TO_CONTRACT_SUCCESS,
  DOCUMENT_EDITED_SUCCESS,
  PARSE_CLAUSE_ERROR,
  PARSE_CLAUSE_SUCEEDED,
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
      },
      /* Below temporary */
      {
        object: 'block',
        type: 'heading_one',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Gestalt Design Service Agreement',
          marks: []
        }],
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque shipper, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae deliverable vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui receiver voluptatem sequi nesciunt.',
          marks: []
        }],
      },
      {
        object: 'block',
        type: 'heading_three',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Lorem Ipsum',
          marks: []
        }],
      },
      {
        object: 'block',
        type: 'paragraph',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
          marks: []
        }],
      },
      {
        object: 'block',
        type: 'heading_two',
        data: {},
        nodes: [{
          object: 'text',
          text: 'Confirmation of Receipt',
          marks: []
        }],
      }
      /* Above temporary */
      ],
    }
  }),
  clauses: {},
  /* Below temporary */
  headers: [
    {
      key: '3',
      text: 'Gestalt Design Service Agreement',
      type: 'heading_one'
    },
    {
      key: '7',
      text: 'Lorem Ipsum',
      type: 'heading_three'
    },
    {
      key: '11',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '12',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '13',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '14',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '15',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '16',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '17',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '21',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '22',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '23',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '24',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '25',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '26',
      text: 'Confirmation of Receipt',
      type: 'heading_two'
    },
    {
      key: '27',
      text: 'Bottom',
      type: 'heading_two'
    }
  ]
  /* Above temporary */
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DOCUMENT_EDITED_SUCCESS: {
      return {
        ...state,
        markdown: action.markdown,
        slateValue: action.slateValue,
        headers: action.headers,
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
            uri: action.uri,
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

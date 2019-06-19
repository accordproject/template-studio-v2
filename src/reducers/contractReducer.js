import { Value } from 'slate';

const initialState = {
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
      }]
    }
  }),
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DOCUMENT_EDITED_SUCCESS':
      return {
        ...state,
        markdown: action.markdown,
        slateValue: action.slateValue,
      };
    case 'DOCUMENT_EDITED_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;

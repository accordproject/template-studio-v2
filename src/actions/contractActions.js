import {
  ADD_TO_CONTRACT,
  ADD_TO_CONTRACT_SUCCESS,
  DOCUMENT_EDITED,
  DOCUMENT_EDITED_SUCCESS,
  PARSE_CLAUSE_ERROR,
  PARSE_CLAUSE_SUCEEDED,
  PASTE_TO_CONTRACT,
  PASTE_TO_CONTRACT_SUCCESS,
  REMOVE_CLAUSE_FROM_CONTRACT,
} from './constants';

export const documentEdited = (value, markdown) => ({
  type: DOCUMENT_EDITED,
  slateValue: value,
  markdown
});

export const documentEditedSuccess = (value, markdown, headers) => ({
  type: DOCUMENT_EDITED_SUCCESS,
  slateValue: value,
  markdown,
  headers,
});

export const addToContractAction = uri => ({
  type: ADD_TO_CONTRACT,
  uri,
});

export const addToContractSuccess = (clauseId, clauseTemplateRef) => ({
  type: ADD_TO_CONTRACT_SUCCESS,
  clauseId,
  clauseTemplateRef,
});

export const removeFromContractAction = props => ({
  type: REMOVE_CLAUSE_FROM_CONTRACT,
  key: props.attributes['data-key'],
  clauseId: props.clauseId,
});

export const parseClauseSuccess = (clauseId, parseResult) => ({
  type: PARSE_CLAUSE_SUCEEDED,
  clauseId,
  parseResult,
});

export const parseClauseError = (clauseId, error) => ({
  type: PARSE_CLAUSE_ERROR,
  clauseId,
  error,
});

export const pasteToContractAction = (clauseId, clauseTemplateRef, text) => ({
  type: PASTE_TO_CONTRACT,
  clauseId,
  clauseTemplateRef,
  text
});

export const pasteToContractSuccess = (clauseId, clauseTemplateRef) => ({
  type: PASTE_TO_CONTRACT_SUCCESS,
  clauseId,
  clauseTemplateRef,
});

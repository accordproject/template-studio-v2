export const documentEdited = (value, markdown) => ({
  type: 'DOCUMENT_EDITED',
  slateValue: value,
  markdown,
});

export const documentEditedSuccess = (value, markdown) => ({
  type: 'DOCUMENT_EDITED_SUCCESS',
  slateValue: value,
  markdown,
});

export const addToContractAction = uri => ({
  type: 'ADD_TO_CONTRACT',
  uri,
});

export const addToContractSuccess = (clauseId, clauseTemplateRef) => ({
  type: 'ADD_TO_CONTRACT_SUCCESS',
  clauseId,
  clauseTemplateRef,
});

export const parseClauseSuccess = (clauseId, parseResult) => ({
  type: 'PARSE_CLAUSE_SUCEEDED',
  clauseId,
  parseResult,
});

export const parseClauseError = (clauseId, error) => ({
  type: 'PARSE_CLAUSE_ERROR',
  clauseId,
  error,
});

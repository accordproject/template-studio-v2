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

export const documentEditedError = error => ({
  type: 'DOCUMENT_EDITED_ERROR',
  error,
});

export const clauseAdded = value => ({
  type: 'CLAUSE_ADDED',
  slateValue: value,
});

export const clauseAddedSuccess = value => ({
  type: 'CLAUSE_ADDED_SUCCESS',
  slateValue: value,
});

export const clauseAddedError = error => ({
  type: 'CLAUSE_ADDED_ERROR',
  error,
});

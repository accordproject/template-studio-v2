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

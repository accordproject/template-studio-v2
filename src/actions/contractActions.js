export const markdownChanged = markdown => ({
  type: 'MARKDOWN_CHANGED',
  markdown,
});

export const markdownChangedSuccess = markdown => ({
  type: 'MARKDOWN_CHANGED_SUCCESS',
  markdown,
});

export const markdownChangedError = error => ({
  type: 'MARKDOWN_CHANGED_ERROR',
  error,
});

export const clauseAdded = markdown => ({
  type: 'CLAUSE_ADDED',
  markdown,
});

export const clauseAddedSuccess = markdown => ({
  type: 'CLAUSE_ADDED_SUCCESS',
  markdown,
});

export const clauseAddedError = error => ({
  type: 'CLAUSE_ADDED_ERROR',
  error,
});

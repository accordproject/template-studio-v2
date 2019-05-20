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

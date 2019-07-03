export const updateModelFileAction = value => ({
  type: 'UPDATE_MODEL_FILE',
  modelFile: { 'test.cto': value },
});

export const updateModelFileSuccess = modelFile => ({
  type: 'UPDATE_MODEL_FILE_SUCCEEDED',
  modelFile,
});

export const updateModelManagerSuccess = modelManager => ({
  type: 'UPDATE_MODEL_MANAGER_SUCCEEDED',
  modelManager,
});

export const updateModelManagerError = error => ({
  type: 'UPDATE_MODEL_ERROR_SUCCEEDED',
  error,
});

export const validateClauseModelFilesAction = (clauseTemplateId, fileName) => ({
  type: 'VALIDATE_CLAUSE_MODEL_FILES',
  clauseTemplateId,
  fileName
});

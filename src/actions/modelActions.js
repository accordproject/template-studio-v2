export const updateModelFileAction = value => ({
  type: 'UPDATE_MODEL_FILE',
  modelFile: { 'test.cto': value },
});

export const validateModelFilesAction = () => ({
  type: 'VALIDATE_MODEL_FILES',
});

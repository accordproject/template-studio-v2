import {
  UPDATE_MODEL_ERROR_SUCCEEDED,
  UPDATE_MODEL_MANAGER_SUCCEEDED,
  VALIDATE_CLAUSE_MODEL_FILES,
  UPDATE_MODEL_ERROR_ATTEMPT,
} from './constants';

export const updateModelManagerSuccess = modelManager => ({
  type: UPDATE_MODEL_MANAGER_SUCCEEDED,
  modelManager,
});

export const updateModelManagerError = error => ({
  type: UPDATE_MODEL_ERROR_SUCCEEDED,
  error,
});

export const updateModelManagerAction = (error) => {
  console.log('yes');
  return ({
    type: UPDATE_MODEL_ERROR_ATTEMPT,
    error,
  });
};

export const validateClauseModelFilesAction = (clauseTemplateId, fileName) => ({
  type: VALIDATE_CLAUSE_MODEL_FILES,
  clauseTemplateId,
  fileName
});

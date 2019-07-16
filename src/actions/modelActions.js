import {
  UPDATE_MODEL_ADD_ERROR_SUCCEEDED,
  UPDATE_MODEL_REMOVE_ERROR_SUCCEEDED,
  UPDATE_MODEL_MANAGER_SUCCEEDED,
  VALIDATE_CLAUSE_MODEL_FILES,
} from './constants';

export const updateModelManagerSuccess = modelManager => ({
  type: UPDATE_MODEL_MANAGER_SUCCEEDED,
  modelManager,
});

export const updateModelManagerAddError = (error, clauseTemplateId) => ({
  type: UPDATE_MODEL_ADD_ERROR_SUCCEEDED,
  error,
  clauseTemplateId
});

export const updateModelManagerRemoveError = (error, clauseTemplateId) => ({
  type: UPDATE_MODEL_REMOVE_ERROR_SUCCEEDED,
  error,
  clauseTemplateId
});

export const validateClauseModelFilesAction = (clauseTemplateId, fileName) => ({
  type: VALIDATE_CLAUSE_MODEL_FILES,
  clauseTemplateId,
  fileName
});

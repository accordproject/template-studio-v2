import { takeLatest, put, select } from 'redux-saga/effects';
import { ModelManager } from 'composer-concerto';
import * as selectors from '../selectors/modelSelectors';
import * as actions from '../actions/modelActions';

export function* validateModelFiles() {
  // get all the model files in the state
  const modelFiles = yield select(selectors.modelFiles);

  try {
    const modelManager = new ModelManager();
    Object.keys(modelFiles).forEach((fileName) => {
      modelManager.addModelFile(modelFiles[fileName], fileName, true);
    });

    // download external dependencies
    yield modelManager.updateExternalModels();

    // validate the model manager
    modelManager.validateModelFiles();

    yield put({
      type: 'UPDATE_MODEL_MANAGER_SUCCEEDED',
      modelManager,
    });

    yield put({
      type: 'UPDATE_MODEL_ERROR_SUCCEEDED',
      error: null,
    });
  } catch (err) {
    err.type = 'Model';
    err.fileName = 'test.cto';
    yield put({
      type: 'UPDATE_MODEL_ERROR_SUCCEEDED',
      error: err,
    });
  }
}

export function* updateModelFileOnStore(modelFileAction) {
  yield put({
    type: 'UPDATE_MODEL_FILE_SUCCEEDED',
    modelFile: modelFileAction.modelFile,
  });

  yield put(actions.validateModelFilesAction());
}

export const modelSaga = [
  takeLatest('UPDATE_MODEL_FILE', updateModelFileOnStore),
  takeLatest('VALIDATE_MODEL_FILES', validateModelFiles),
];

import { takeLatest, put, select } from 'redux-saga/effects';
import { ModelManager } from 'composer-concerto';
import * as selectors from '../selectors/modelSelectors';
import * as actions from '../actions/modelActions';

/**
 * saga which yields to putting the successful model manager into the store
 * and subsequently clears all model manager errors from the store
 */
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

    yield put(actions.updateModelManagerSuccess(modelManager));

    yield put(actions.updateModelManagerError(null));
  } catch (err) {
    err.type = 'Model';
    err.fileName = 'test.cto';
    yield put(actions.updateModelManagerError(err));
  }
}

/**
 * saga which yields to updating the model file and
 * subsequently puts a valid model in the store
 */
export function* updateModelFileOnStore(modelFileAction) {
  yield put(actions.updateModelFileSuccess(modelFileAction.modelFile));

  yield put(actions.validateModelFilesAction());
}

export const modelSaga = [
  takeLatest('UPDATE_MODEL_FILE', updateModelFileOnStore),
  takeLatest('VALIDATE_MODEL_FILES', validateModelFiles),
];

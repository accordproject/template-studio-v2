import { all } from 'redux-saga/effects';
import { templatesSaga } from './templatesSaga';
import { modelSaga } from './modelSaga';
import { logicSaga } from './logicSaga';
import { sampleSaga } from './sampleSaga';
import { contractSaga } from './contractSaga';

/**
 * saga to yield all others
 */
export default function* rootSaga() {
  yield all([
    ...templatesSaga,
    ...modelSaga,
    ...logicSaga,
    ...sampleSaga,
    ...contractSaga,
  ]);
}

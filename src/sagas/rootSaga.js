import { all } from 'redux-saga/effects';
import { templatesSaga } from './templatesSaga';
import { modelSaga } from './modelSaga';
import { logicSaga } from './logicSaga';

export default function* rootSaga() {
  yield all([
    ...templatesSaga,
    ...modelSaga,
    ...logicSaga,
  ]);
}

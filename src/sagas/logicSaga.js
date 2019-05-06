import { takeLatest, put } from 'redux-saga/effects';

export function* updateLogicOnStore(logicMockAction) {
  yield put({
    type: 'UPDATE_LOGIC_MOCK_SUCCEEDED',
    logic: logicMockAction.logic,
  });
}

export const logicSaga = [
  takeLatest('UPDATE_LOGIC_MOCK', updateLogicOnStore),
];

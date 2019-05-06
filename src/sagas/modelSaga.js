import { takeLatest, put } from 'redux-saga/effects';

export function* updateModelOnStore(modelMockAction) {
  yield put({
    type: 'UPDATE_MODEL_MOCK_SUCCEEDED',
    model: modelMockAction.model,
  });
}

export const modelSaga = [
  takeLatest('UPDATE_MODEL_MOCK', updateModelOnStore),
];

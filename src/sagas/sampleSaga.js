import { takeLatest, put } from 'redux-saga/effects';

export function* updateSampleOnStore(sampleMockAction) {
  yield put({
    type: 'UPDATE_SAMPLE_MOCK_SUCCEEDED',
    sample: sampleMockAction.sample,
  });
}

export const sampleSaga = [
  takeLatest('UPDATE_SAMPLE_MOCK', updateSampleOnStore),
];

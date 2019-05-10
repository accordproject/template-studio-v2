import { takeLatest, put } from 'redux-saga/effects';
import * as actions from '../actions/sampleActions';

export function* updateSampleOnStore(sampleMockAction) {
  yield put(actions.updateSampleMockSuccess(sampleMockAction.sample));
}

export const sampleSaga = [
  takeLatest('UPDATE_SAMPLE_MOCK', updateSampleOnStore),
];

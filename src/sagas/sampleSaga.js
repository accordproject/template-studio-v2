import { takeLatest, put } from 'redux-saga/effects';
import * as actions from '../actions/sampleActions';

/**
 * saga to take a sample action and update successfully in the store
 */
export function* updateSampleOnStore(sampleMockAction) {
  yield put(actions.updateSampleMockSuccess(sampleMockAction.sample));
}

export const sampleSaga = [
  takeLatest('UPDATE_SAMPLE_MOCK', updateSampleOnStore),
];

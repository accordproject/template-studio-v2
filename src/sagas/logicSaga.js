import { takeLatest, put } from 'redux-saga/effects';
import * as actions from '../actions/logicActions';

export function* updateLogicOnStore(logicMockAction) {
  yield put(actions.updateLogicMockSuccess(logicMockAction.logic));
}

export const logicSaga = [
  takeLatest('UPDATE_LOGIC_MOCK', updateLogicOnStore),
];

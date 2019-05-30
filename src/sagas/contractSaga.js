import { takeLatest, takeLeading, put } from 'redux-saga/effects';
import * as actions from '../actions/contractActions';

export function* updateMarkdown(action) {
  yield put(actions.markdownChangedSuccess(action.markdown));
}

export function* addClause(action) {
  yield put(actions.clauseAddedSuccess(action.markdown));
}

export const contractSaga = [
  takeLeading('MARKDOWN_CHANGED', updateMarkdown),
  takeLatest('CLAUSE_ADDED', addClause),
];

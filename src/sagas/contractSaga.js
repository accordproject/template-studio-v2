import { takeLatest, select, put } from 'redux-saga/effects';
import * as actions from '../actions/contractActions';
import * as contractSelectors from '../selectors/contractSelectors';

/**
 * saga to update the contract in the store if it has changed
 */
export function* updateDocument(action) {
  const currentMarkdown = yield select(contractSelectors.markdown);
  // only update the store if the document has changed
  if (currentMarkdown === action.markdown) return;
  yield put(actions.documentEditedSuccess(action.slateValue, action.markdown));
}

export function* addClause(action) {
  yield put(actions.clauseAddedSuccess(action.slateValue));
}

export const contractSaga = [
  takeLatest('DOCUMENT_EDITED', updateDocument),
  takeLatest('CLAUSE_ADDED', addClause),
];

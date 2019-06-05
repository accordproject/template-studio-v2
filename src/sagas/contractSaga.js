import { takeLatest, select, put } from 'redux-saga/effects';
import _ from 'lodash';
import { Value } from 'slate';
import * as actions from '../actions/contractActions';
import * as contractSelectors from '../selectors/contractSelectors';

/**
 * saga to update the contract in the store if it has changed
 */
export function* updateDocument(action) {
  const currentMarkdown = yield select(contractSelectors.markdown);
  const currentSlateValue = yield select(contractSelectors.slateValue);
  // only update the store if the document has changed
  console.log('prev', currentSlateValue);
  console.log('next', action.slateValue);
  console.log(currentSlateValue.annotations.equals(action.slateValue.annotations));
  // return;
  if (currentSlateValue.annotations.equals(action.slateValue.annotations)) return;
  yield put(actions.documentEditedSuccess(action.slateValue, action.markdown));
}

export function* addClause(action) {
  console.log(action.slateValue);
  yield put(actions.clauseAddedSuccess(Value.fromJSON(action.slateValue)));
}

export const contractSaga = [
  takeLatest('DOCUMENT_EDITED', updateDocument),
  takeLatest('CLAUSE_ADDED', addClause),
];

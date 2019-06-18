import {
  takeLatest, select, put
} from 'redux-saga/effects';
import * as actions from '../actions/contractActions';
import * as contractSelectors from '../selectors/contractSelectors';

/**
 * saga to update the contract in the store if it has changed
 */
export function* updateDocument(action) {
  const currentSlateValue = yield select(contractSelectors.slateValue);
  // only update the store if the slate value has changed
  if (currentSlateValue.equals(action.slateValue)) return;
  yield put(actions.documentEditedSuccess(action.slateValue, action.markdown));
}

export const contractSaga = [
  takeLatest('DOCUMENT_EDITED', updateDocument),
];

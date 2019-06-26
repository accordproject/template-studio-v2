import {
  takeLatest, select, put, call, takeEvery
} from 'redux-saga/effects';
import {
  PluginManager, List, FromMarkdown, ToMarkdown
} from '@accordproject/markdown-editor';
import ClausePlugin from '@accordproject/cicero-ui/dist/plugins/ClausePlugin';
import { Value } from 'slate';
import uuidv4 from 'uuidv4';

import * as actions from '../actions/contractActions';
import * as appActions from '../actions/appActions';
import * as clauseTemplatesActions from '../actions/clauseTemplatesActions';
import * as contractSelectors from '../selectors/contractSelectors';
import { addTemplateObjectToStore } from './templatesSaga';

/**
 * saga to update the contract in the store if it has changed
 */
export function* updateDocument(action) {
  const currentSlateValue = yield select(contractSelectors.slateValue);
  // only update the store if the slate value has changed
  if (currentSlateValue.equals(action.slateValue)) return;
  try {
    yield put(actions.documentEditedSuccess(action.slateValue, action.markdown));
  } catch (err) {
    yield put(appActions.addAppError('Failed to update document', err));
  }
}

/**
 * saga which adds a clause node to the current slate value
 */
export function* addToContract(action) {
  try {
    const pluginManager = new PluginManager([List(), ClausePlugin()]);
    const fromMarkdown = new FromMarkdown(pluginManager);
    const toMarkdown = new ToMarkdown(pluginManager);

    const templateObj = yield call(addTemplateObjectToStore, action);

    const slateValue = yield select(contractSelectors.slateValue);
    const { metadata } = templateObj;

    const currentPosition = slateValue.selection.anchor.path.get(0);
    const clauseMd = `\`\`\` <clause src=${action.uri} clauseId=${uuidv4()}>
  ${metadata.getSample()}
  \`\`\``;
    const value = fromMarkdown.convert(clauseMd);
    const clauseNode = value.toJSON().document.nodes[0];

    const newSlateValue = JSON.parse(JSON.stringify(slateValue.toJSON()));
    const newMd = toMarkdown.convert(newSlateValue);
    const { nodes } = newSlateValue.document;
    nodes.splice(currentPosition, 0, clauseNode);
    yield put(actions.documentEdited(Value.fromJSON(newSlateValue), newMd));
    const grammar = templateObj.parserManager.getTemplatizedGrammar();
    const clauseTemplateId = uuidv4();
    // TODO: add other necessary props besides grammar
    yield put(clauseTemplatesActions.addClauseTemplate({ grammar, id: clauseTemplateId }));
  } catch (err) {
    yield put(appActions.addAppError('Failed to add clause to contract', err));
  }
}

export const contractSaga = [
  takeLatest('DOCUMENT_EDITED', updateDocument),
  takeEvery('ADD_TO_CONTRACT', addToContract)
];

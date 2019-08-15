/* Saga */
import {
  takeLatest,
  select,
  put,
  call,
  takeEvery
} from 'redux-saga/effects';

/* Markdown */
import {
  PluginManager,
  List,
  FromMarkdown,
  ToMarkdown
} from '@accordproject/markdown-editor';

/* Plugins */
import { ClausePlugin } from '@accordproject/cicero-ui';
import { Value } from 'slate';
import uuidv4 from 'uuidv4';

/* Actions */
import * as ACT from './actions';
import * as actions from '../actions/contractActions';
import * as appActions from '../actions/appActions';
import * as clauseTemplatesActions from '../actions/clauseTemplatesActions';

/* Selectors */
import * as templatesSelectors from '../selectors/templatesSelectors';
import * as contractSelectors from '../selectors/contractSelectors';
import { addTemplateObjectToStore } from './templatesSaga';

/* Constants */
import {
  ADD_TO_CONTRACT,
  DOCUMENT_EDITED,
  REMOVE_CLAUSE_FROM_CONTRACT
} from '../actions/constants';

/**
 * Saga to update the contract in the store if it has changed
 * Determines if heading or clause nodes exist
 * If so, populates an array to send to the store for navigation
 */
export function* updateDocument(action) {
  const currentSlateValue = yield select(contractSelectors.slateValue);
  // only update the store if the slate value has changed
  if (currentSlateValue.equals(action.slateValue)) return;

  const templates = yield select(templatesSelectors.templateObjects);
  // create an array of all headers for navigation
  const headers = [];
  yield action.slateValue.document.nodes.forEach((node) => {
    if (ACT.headingExists(node)) {
      const headerSlateObj = {
        key: node.key,
        text: node.text,
        type: node.type
      };
      headers.push(headerSlateObj);
    }
    if (ACT.headingClause(node)) {
      const clauseId = node.data.get('attributes').clauseid;
      const clauseSrcUrl = node.data.get('attributes').src;

      const clauseDisplayName = ACT.clauseDisplayNameFinder(templates[clauseSrcUrl]);
      const clauseName = ACT.clauseNameFinder(templates[clauseSrcUrl]);

      const clauseNameText = clauseDisplayName || clauseName;

      const headerSlateObj = {
        key: clauseId,
        text: clauseNameText,
        type: node.type
      };
      headers.push(headerSlateObj);
    }
  });

  try {
    yield put(actions.documentEditedSuccess(action.slateValue, action.markdown, headers));
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

    // Temporary fix based on the following idea:
    // if you apply “fromMarkdown” to the grammar before parsing,
    // both will have the same whitespace processing done and parsing will work better
    // markdown <-commonmark-> markdown AST
    const roundTrip = (markdownText) => {
      const value = fromMarkdown.convert(markdownText);
      const markdownRound = toMarkdown.convert(value);
      return markdownRound;
    };

    // get the templateObj from the store if we already have it
    // or load it and add it to the store if we do not
    const templateObj = yield call(addTemplateObjectToStore, action);

    const slateValue = yield select(contractSelectors.slateValue);
    const metadata = templateObj.getMetadata();

    // get the user's current position in Slate dom to insert clause at
    const currentPosition = slateValue.selection.anchor.path.get(0);
    const clauseId = uuidv4(); // unique identifier for a clause instance
    const clauseMd = `\`\`\` <clause src=${action.uri} clauseId=${clauseId}>
  ${metadata.getSample()}
  \`\`\``;

    // Create a new paragraph in markdown for spacing between clauses
    const paragraphSpaceMd = 'This is a new clause!';
    const spacerValue = fromMarkdown.convert(paragraphSpaceMd);
    const paragraphSpaceNode = spacerValue.toJSON().document.nodes[0];

    const value = fromMarkdown.convert(clauseMd);
    const clauseNode = value.toJSON().document.nodes[0];

    const newSlateValue = JSON.parse(JSON.stringify(slateValue.toJSON()));
    const newMd = toMarkdown.convert(newSlateValue);
    const { nodes } = newSlateValue.document;

    // add the clause node to the Slate dom at current position
    // Temporary fix to separate clauses, adding the new paragraph at
    // end of splice
    nodes.splice(currentPosition, 0, clauseNode, paragraphSpaceNode);

    // update contract on store with new slate and md values
    yield put(actions.documentEdited(Value.fromJSON(newSlateValue), newMd));
    const grammar = templateObj.parserManager.getTemplatizedGrammar();

    // Temporary roundtrip and rebuild grammar
    const grammarRound = roundTrip(grammar);
    templateObj.parserManager.buildGrammar(grammarRound);

    const sampleText = templateObj.getMetadata().getSamples().default;
    const model = templateObj.getModelManager().getModels();
    const logic = templateObj.getScriptManager().getLogic();
    const clauseTemplateId = uuidv4(); // unique identifier for a clause template

    // add a new clause template to the store so user can edit template
    yield put(clauseTemplatesActions.addClauseTemplate({
      metadata, model, logic, sampleText, grammar, id: clauseTemplateId
    }));

    // add instatiated clause to list of clauses in the contract state
    yield put(actions.addToContractSuccess(clauseId, clauseTemplateId));
  } catch (err) {
    yield put(appActions.addAppError('Failed to add clause to contract', err));
  }
}

/**
 * saga which removes a clause node from the current Slate value
 */
export function* removeFromContract(clause) {
  try {
    const pluginManager = new PluginManager([List(), ClausePlugin()]);
    const toMarkdown = new ToMarkdown(pluginManager);
    // Select the current Slate value
    const slateValue = yield select(contractSelectors.slateValue);
    // Remove the node in the Slate DOM with the provided key
    const slateWithoutNode = slateValue.removeNode(clause.key);
    // Regenerate the Slate value
    const newSlateValue = JSON.parse(JSON.stringify(slateWithoutNode.toJSON()));
    // Convert to Markdown
    const newMd = toMarkdown.convert(newSlateValue);
    // Put onto the store with the new Slate and Markdown state
    yield put(actions.documentEdited(Value.fromJSON(newSlateValue), newMd));
  } catch (err) {
    yield put(appActions.addAppError('Failed to remove clause from contract', err));
  }
}

export const contractSaga = [
  takeLatest(DOCUMENT_EDITED, updateDocument),
  takeEvery(ADD_TO_CONTRACT, addToContract),
  takeEvery(REMOVE_CLAUSE_FROM_CONTRACT, removeFromContract)
];

import { Clause } from '@accordproject/cicero-core';
import { SlateTransformer } from '@accordproject/markdown-slate';
import store from '../store';
import { parseClauseSuccess, parseClauseError } from '../actions/contractActions';

const slateTransformer = new SlateTransformer();

/**
 * Parses user inputted text for a template using Cicero
 * @param {object} template The cicero template object.
 * @param {string} text The user submitted text.
 * @param {string} clauseId The uuid of the clause
 * @returns {Promise} The result of the parse or an error.
 */
export default async function parseClause(template, text, clauseId, editorRef, uri) {
  try {
    const ciceroClause = new Clause(template);
    ciceroClause.parse(text);
    const parseResult = ciceroClause.getData();
    store.dispatch(parseClauseSuccess(clauseId, parseResult));
    const clauseNode = editorRef.current.findClauseNode(clauseId);
    if (!clauseNode) {
      throw new Error('ERROR - ContractEditor.onClauseEdited: clause not found');
    }
    const clause = new Clause(template);
    clause.parse(text);
    const variableText = await clause.draft({ wrapVariables: false });
    const clauseMd = `\`\`\` <clause src=${uri} clauseid=${clauseId}>
  ${variableText}
  \`\`\``;
    const clauseValue = slateTransformer.fromMarkdown(clauseMd);
    const newClauseNode = clauseValue.toJSON().document.nodes[0];

    editorRef.current.replaceNodeByKey(clauseNode.key, newClauseNode);
    return parseResult;
  } catch (error) {
    store.dispatch(parseClauseError(clauseId, error));
    return error;
  }
}

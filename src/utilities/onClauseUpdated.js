import { Clause, Template } from '@accordproject/cicero-core';
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
export default async function onClauseUpdated(template, editorRef, clauseNode) {
  const clauseId = clauseNode.data.get('clauseid');
  try {
    const ciceroClause = new Clause(template);
    const templateUri = clauseNode.data.get('src');
    const value = {
      document: {
        nodes: clauseNode.nodes
      }
    };

    const slateTransformer = new SlateTransformer();
    const parseText = slateTransformer.toMarkdown(value, { wrapVariables: false });
    ciceroClause.parse(parseText);
    const parseResult = ciceroClause.getData();
    store.dispatch(parseClauseSuccess(clauseId, parseResult));

    if (template.grammarHasErgoExpression()) {
      // only replace node if template as computed expression
      const variableText = await ciceroClause.draft({ wrapVariables: false });
      const clauseMd = `\`\`\` <clause src=${templateUri} clauseid=${clauseId}>
  ${variableText}
  \`\`\``;
      const clauseValue = slateTransformer.fromMarkdown(clauseMd);
      const newClauseNode = clauseValue.toJSON().document.nodes[0];
      editorRef.current.replaceNodeByKey(clauseNode.key, newClauseNode);
    }
    return parseResult;
  } catch (error) {
    store.dispatch(parseClauseError(clauseId, error));
    return error;
  }
}

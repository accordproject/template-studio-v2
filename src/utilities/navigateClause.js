/* These changes are to navigate PARSE ERRORS only */
/* Model errors will come later */

// This should be passed to the ContractEditor (or current)
// Adjust to find the node in the Slate DOM
export const findClauseNode = (clauseId) => {
  const { value } = this.state;

  let clauseNode = null;
  value.document.nodes.forEach((n) => {
    if (n.type !== 'clause') return;
    if (n.data.get('clauseId') === clauseId) {
      clauseNode = n;
    }
  });
  return clauseNode;
};

// This should also be passed to the ContractEditor (or current)
// Will scroll to the node in the Slate DOM
export const scrollToClause = (clauseNode) => {
  const el = document.querySelector(`[data-key="${clauseNode.key}"]`);
  el.scrollIntoView({ behavior: 'smooth' });
};

// This gets passed to error, when the file is clicked,
// this runs with the error's associated clauseId
export const navigateToClauseError = (clauseId) => {
  const clauseNode = findClauseNode(clauseId);

  if (!clauseNode) {
    console.error('Error: clause not found');
    return;
  }
  scrollToClause(clauseNode);
};

export const addClauseTemplate = clauseTemplate => ({
  type: 'ADD_CLAUSE_TEMPLATE',
  clauseTemplate,
});

export const editClauseGrammarAction = (clauseTemplateId, grammar) => ({
  type: 'EDIT_CLAUSE_GRAMMAR',
  clauseTemplateId,
  grammar,
});

export const editClauseSampleAction = (clauseTemplateId, sample) => ({
  type: 'EDIT_CLAUSE_SAMPLE',
  clauseTemplateId,
  sample,
});

export const editClauseLogicAction = (clauseTemplateId, logic) => ({
  type: 'EDIT_CLAUSE_LOGIC',
  clauseTemplateId,
  logic,
});

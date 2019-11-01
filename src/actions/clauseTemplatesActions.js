import {
	ADD_CLAUSE_TEMPLATE,
	REMOVE_CLAUSE_TEMPLATE,
	EDIT_CLAUSE_GRAMMAR,
	EDIT_CLAUSE_LOGIC,
	EDIT_CLAUSE_MODEL,
	EDIT_CLAUSE_MODEL_SUCCESS,
	EDIT_CLAUSE_PACKAGE_JSON,
	EDIT_CLAUSE_SAMPLE,
} from './constants';

export const addClauseTemplate = clauseTemplate => ({
	type: ADD_CLAUSE_TEMPLATE,
	clauseTemplate,
});

export const removeClauseTemplate = clauseId => ({
	type: REMOVE_CLAUSE_TEMPLATE,
	clauseId
});

export const editClauseGrammarAction = (clauseTemplateId, grammar) => ({
	type: EDIT_CLAUSE_GRAMMAR,
	clauseTemplateId,
	grammar,
});

export const editClauseSampleAction = (clauseTemplateId, sample) => ({
	type: EDIT_CLAUSE_SAMPLE,
	clauseTemplateId,
	sample,
});

export const editClauseModelAction = (clauseTemplateId, fileName, content) => ({
	type: EDIT_CLAUSE_MODEL,
	clauseTemplateId,
	fileName,
	content,
});

export const editClauseModelSuccess = (clauseTemplateId, fileName, content) => ({
	type: EDIT_CLAUSE_MODEL_SUCCESS,
	clauseTemplateId,
	fileName,
	content,
});

export const editClauseLogicAction = (clauseTemplateId, fileName, content) => ({
	type: EDIT_CLAUSE_LOGIC,
	clauseTemplateId,
	fileName,
	content,
});

export const editClausePackageJsonAction = (clauseTemplateId, packageJson) => ({
	type: EDIT_CLAUSE_PACKAGE_JSON,
	clauseTemplateId,
	packageJson,
});
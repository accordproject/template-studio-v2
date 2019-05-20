import { Clause } from '@accordproject/cicero-core';
import store from '../store';
import { parseClauseSuccess, parseClauseError } from '../actions/clauseActions';

/**
 * Parses user inputted text for a template using Cicero
 * @param {string} uri The uri of the template.
 * @param {string} text The user submitted text.
 * @returns {} The result of the parse or an error.
 */
export default function parseClause(templateObjs, uri, text, clauseId) {
  try {
    const template = templateObjs[uri];
    const ciceroClause = new Clause(template);
    ciceroClause.parse(text);
    const parseResult = ciceroClause.getData();
    store.dispatch(parseClauseSuccess(clauseId, parseResult));
    return Promise.resolve(parseResult);
  } catch (error) {
    store.dispatch(parseClauseError(clauseId, error));
    return Promise.reject(error);
  }
}

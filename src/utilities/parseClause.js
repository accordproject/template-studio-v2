import { Clause } from '@accordproject/cicero-core';
import store from '../store';
import { parseClauseSuccess, parseClauseError } from '../actions/contractActions';

/**
 * Parses user inputted text for a template using Cicero
 * @param {object} template The cicero template object.
 * @param {string} text The user submitted text.
 * @param {string} clauseId The uuid of the clause
 * @returns {Promise} The result of the parse or an error.
 */
export default function parseClause(template, text, clauseId) {
  try {
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

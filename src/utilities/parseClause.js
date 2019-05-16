import { Clause } from '@accordproject/cicero-core';

/**
 * Parses user inputted text for a template using Cicero
 * @param {string} uri The uri of the template.
 * @param {string} text The user submitted text.
 * @returns {} The result of the parse or an error.
 */
export default function parseClause(templateObjs, uri, text) {
  try {
    const template = templateObjs[uri];
    const ciceroClause = new Clause(template);
    ciceroClause.parse(text);
    return Promise.resolve(ciceroClause.getData());
  } catch (error) {
    return Promise.reject(error);
  }
}

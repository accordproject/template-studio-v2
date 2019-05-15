import { Clause } from '@accordproject/cicero-core';

/**
 * Parses user inputted text for a template using Cicero
 * @param {string} url The url of the template.
 * @param {string} text The user submitted text.
 * @returns {} The result of the parse or an error.
 */
export default function parseTemplate(templateObjs, url, text) {
  try {
    const template = templateObjs[url];
    const ciceroClause = new Clause(template);
    ciceroClause.parse(text);
    return ciceroClause.getData();
  } catch (error) {
    return error;
  }
}

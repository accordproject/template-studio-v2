import * as R from 'ramda';

const modelErrorGather = state => R.toPairs(R.path(['modelState', 'error'], state) || {})
  .map(([clauseTemplateId, modelError]) => ({ clauseTemplateId, modelError }))
  .filter(({ modelError }) => !R.isNil(modelError));

const parseErrorGather = state => R.toPairs(R.path(['contractState', 'clauses'], state) || {})
  .map(([clauseId, clause]) => ({ clauseId, parseError: clause.parseError }))
  .filter(({ parseError }) => !R.isNil(parseError));

const errorsGenerator = state => [...modelErrorGather(state), ...parseErrorGather(state)];

export default errorsGenerator;

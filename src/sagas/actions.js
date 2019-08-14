import * as R from 'ramda';

export const headingClause = node => node.type === 'clause';
const headingOne = node => node.type === 'heading_one';
const headingTwo = node => node.type === 'heading_two';
const headingThree = node => node.type === 'heading_three';

export const headingExists = R.anyPass([headingOne, headingTwo, headingThree]);

export const clauseDisplayNameFinder = src => R
  .path(['metadata', 'packageJson', 'displayName'], src);

export const clauseNameFinder = src => R
  .path(['metadata', 'packageJson', 'name'], src);

import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ErrorLogger } from '@accordproject/cicero-ui';

const ErrorWrapper = styled.div`
  width: 100%;
  position: fixed;
  // bottom: -360px;
  bottom: 0;
  transition: 1s;
  &:hover {
    bottom: 0;
  }
`;
const ErrorContainer = props => (
  <ErrorWrapper>
    <ErrorLogger errors={props.errors}/>
  </ErrorWrapper>
);

ErrorContainer.propTypes = {
  errors: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  // const modelErrors = state.modelState.error ? [state.modelState.error] : [];

  errors: {
    modelErrors: [R.path(['modelState', 'error'], state)]
      .filter(modelError => !R.isNil(modelError)),
    parseErrors: R.toPairs(R.path(['contractState', 'clauses'], state) || {})
      .map(([clauseId, clause]) => ({ clauseId, parseError: clause.parseError }))
      .filter(({ parseError }) => !R.isNil(parseError)),
  },
});

export default connect(mapStateToProps)(ErrorContainer);

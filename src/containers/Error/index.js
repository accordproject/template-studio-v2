import React from 'react';
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
  errors: state.modelState.error ? [state.modelState.error] : [],
});

export default connect(mapStateToProps)(ErrorContainer);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ErrorLogger } from '@accordproject/cicero-ui';

const ErrorWrapper = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
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

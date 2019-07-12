import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ErrorLogger } from '@accordproject/cicero-ui';

import errorsGenerator from './errorReducer';

const ErrorWrapper = styled.div`
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
  errors: errorsGenerator(state),
});

export default connect(mapStateToProps)(ErrorContainer);

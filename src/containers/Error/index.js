/* React */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Components */
import { ErrorLogger } from '@accordproject/cicero-ui';

/* Styling */
import styled from 'styled-components';

/* Utilities */
import errorsGenerator from './errorReducer';

/* Actions */
import navigateToClauseError from '../../utilities/navigateClause';

const ErrorWrapper = styled.div`
  width: 100%;
`;

const ErrorContainer = props => (
  <ErrorWrapper>
    <ErrorLogger errors={props.errors} errorNav={navigateToClauseError}/>
  </ErrorWrapper>
);

ErrorContainer.propTypes = {
  errors: PropTypes.array.isRequired,
  // errorNav: PropTypes.func,
};

const mapStateToProps = state => ({
  errors: errorsGenerator(state),
});

export default connect(mapStateToProps)(ErrorContainer);

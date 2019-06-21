import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Header, Button } from 'semantic-ui-react';
import { removeAppError } from '../../actions/appActions';

const StyledContent = styled(Modal.Content)`
  white-space: pre;
`;

export const ErrorModal = props => (
  <Modal
    open={!!props.errorDescription}
    onClose={props.closeErrorModal}
    size="small"
  >
    <Header content={props.errorName || 'Error'} />
    <StyledContent>
      {`${props.errorDescription}\n${props.errorMessage}`}
    </StyledContent>
    <Modal.Actions>
      <Button color='blue' id='errorCloseBtn' onClick={props.closeErrorModal}>
        Close
      </Button>
    </Modal.Actions>
  </Modal>
);

ErrorModal.propTypes = {
  errorMessage: propTypes.string,
  errorName: propTypes.string,
  errorDescription: propTypes.string,
  closeErrorModal: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errorName: state.appState.error ? state.appState.error.errorName : null,
  errorMessage: state.appState.error ? state.appState.error.errorMessage : null,
  errorDescription: state.appState.error ? state.appState.error.errorDescription : null,
});

const mapDispatchToProps = dispatch => ({
  closeErrorModal: () => dispatch(removeAppError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ErrorModal));

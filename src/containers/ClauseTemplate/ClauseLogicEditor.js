import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErgoEditor from '../BaseEditors/ErgoEditor';
import { editClauseLogicAction } from '../../actions/clauseTemplatesActions';


/**
 * A code editing component for Ergo files
 * @param {*} props the properties for the component
 */
function ClauseLogicEditor(props) {
  return (
    <ErgoEditor
      handleSubmit={props.handleSubmit}
      textValue={props.textValue}
    />
  );
}

ClauseLogicEditor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  value: state.clauseTemplatesState[state.appState.id].logic,
  clauseTemplateid: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  onClauseLogicChange: (...args) => dispatch(editClauseLogicAction(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseLogicEditor));

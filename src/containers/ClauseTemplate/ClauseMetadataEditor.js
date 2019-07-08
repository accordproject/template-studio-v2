import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editClausePackageJsonAction } from '../../actions/clauseTemplatesActions';
import JsonEditor from '../BaseEditors/JsonEditor';

/**
 * A code editing component for package.json files
 * which wraps the Json editor
 * @param {*} props the properties for the component
 */
const ClauseMetadataEditor = props => (
  <JsonEditor
    handleSubmit={value => props.onClausePackageJsonChange(props.clauseTemplateid, value)}
    jsonObject={props.value}
  />
);

ClauseMetadataEditor.propTypes = {
  onClausePackageJsonChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  clauseTemplateid: PropTypes.string,
};

const mapStateToProps = state => ({
  value: state.clauseTemplatesState[state.appState.id].metadata.packageJson,
  clauseTemplateid: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  onClausePackageJsonChange: (...args) => dispatch(editClausePackageJsonAction(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseMetadataEditor));

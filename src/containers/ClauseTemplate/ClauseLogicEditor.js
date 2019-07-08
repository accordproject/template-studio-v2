import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import ErgoEditor from '../BaseEditors/ErgoEditor';
import { editClauseLogicAction } from '../../actions/clauseTemplatesActions';


/**
 * A code editing component for clause template logic files
 * which wraps the ErgoEditor
 * @param {*} props the properties for the component
 */
function ClauseLogicEditor(props) {
  const { logic, onClauseLogicChange, clauseTemplateId } = props;
  const panes = logic.map(file => ({
    menuItem: file.name,
    // eslint-disable-next-line react/display-name
    render: () => (
      <Tab.Pane style={{ height: '800px' }}>
        <ErgoEditor
          key={file.name}
          handleSubmit={value => onClauseLogicChange(clauseTemplateId, file.name, value)}
          textValue={file.content}
        />
      </Tab.Pane>
    )
  }));

  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
}

ClauseLogicEditor.propTypes = {
  onClauseLogicChange: PropTypes.func.isRequired,
  logic: PropTypes.array.isRequired,
  clauseTemplateId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  logic: state.clauseTemplatesState[state.appState.id].logic,
  clauseTemplateId: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  onClauseLogicChange: (...args) => dispatch(editClauseLogicAction(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseLogicEditor));

import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ConcertoEditor from '../BaseEditors/ConcertoEditor';
import { editClauseModelAction } from '../../actions/clauseTemplatesActions';

/**
 * A code editing component for JSON files
 * @param {*} props the properties for the component
 */
function ClauseModelEditor(props) {
  const { model, onClauseModelChange, clauseTemplateId } = props;
  const panes = model.map(file => ({
    menuItem: file.name,
    // eslint-disable-next-line react/display-name
    render: () => (
      <Tab.Pane style={{ height: '800px' }}>
        <ConcertoEditor
          key={file.name}
          handleSubmit={value => onClauseModelChange(clauseTemplateId, file.name, value)}
          textValue={file.content}
        />
      </Tab.Pane>
    )
  }));

  return (
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
  );
}

ClauseModelEditor.propTypes = {
  model: PropTypes.array.isRequired,
  onClauseModelChange: PropTypes.func.isRequired,
  clauseTemplateId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  model: state.clauseTemplatesState[state.appState.id].model,
  clauseTemplateId: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  onClauseModelChange: (...args) => dispatch(editClauseModelAction(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClauseModelEditor);

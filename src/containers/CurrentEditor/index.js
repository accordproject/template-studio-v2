import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateModelFileAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import { updateSampleMockAction } from '../../actions/sampleActions';
import ClauseTemplateEditor from '../ClauseTemplateEditor';
import ContractEditor from '../ContractEditor';
import ConcertoEditor from '../ConcertoEditor';
import ErgoEditor from '../ErgoEditor';
import JsonEditor from '../JsonEditor';

const CurrentEditor = (props) => {
  const { editor } = props;
  switch (editor) {
    case 'contractExampleText':
      return (<ContractEditor />);
    case 'contractTemplate':
      return (<ContractEditor />);
    case 'clauseTemplate':
      return (<ClauseTemplateEditor />);
    case 'exampleText':
      return (<ClauseTemplateEditor />);
    case 'model':
      return (
        <ConcertoEditor />
      );
    case 'logic':
      return (
      <ErgoEditor />
      );
    case 'metadata':
      return (
        <JsonEditor />
      );
    default:
      return <ContractEditor />;
  }
};

CurrentEditor.propTypes = {
  editor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  editor: state.appState.editor,
  id: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  updateModelFile: value => dispatch(updateModelFileAction(value)),
  updateLogicMock: value => dispatch(updateLogicMockAction(value)),
  updateSampleMock: value => dispatch(updateSampleMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentEditor);

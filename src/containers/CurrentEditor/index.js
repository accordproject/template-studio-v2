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
  switch (props.editor) {
    case 'contract':
      return (<ContractEditor />);
    case 'clause':
      return (<ClauseTemplateEditor />);
    case 'model':
      return (
        <ConcertoEditor
          textValue={props.modelFileContents}
          handleSubmit={props.updateModelFile}
        />
      );
    case 'logic':
      return (
      <ErgoEditor
        textValue={props.logicMockValue}
        handleSubmit={props.updateLogicMock}
      />
      );
    case 'metadata':
      return (
        <JsonEditor
          jsonObject={props.sampleMockValue}
          handleSubmit={props.updateSampleMock}
        />
      );
    default:
      return <ContractEditor />;
  }
};

CurrentEditor.propTypes = {
  editor: PropTypes.string.isRequired,
  logicMockValue: PropTypes.string,
  modelFileContents: PropTypes.string,
  sampleMockValue: PropTypes.string,
  updateLogicMock: PropTypes.func.isRequired,
  updateModelFile: PropTypes.func.isRequired,
  updateSampleMock: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modelFileContents: state.modelState.modelFiles['test.cto'],
  logicMockValue: state.logicState.logic,
  sampleMockValue: state.sampleState.sample,
  editor: state.appState.editor,
});

const mapDispatchToProps = dispatch => ({
  updateModelFile: value => dispatch(updateModelFileAction(value)),
  updateLogicMock: value => dispatch(updateLogicMockAction(value)),
  updateSampleMock: value => dispatch(updateSampleMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentEditor);

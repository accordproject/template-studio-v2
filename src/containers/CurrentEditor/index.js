import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateModelFileAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import { updateSampleMockAction } from '../../actions/sampleActions';
import ClauseTemplateGrammarEditor from '../ClauseTemplate/ClauseGrammarEditor';
import ClauseExampleTextEditor from '../ClauseTemplate/ClauseExampleTextEditor';
import ContractTemplateEditor from '../ContractTemplateEditor';
import ContractExampleTextEditor from '../ContractExampleTextEditor';
import ConcertoEditor from '../BaseEditors/ConcertoEditor';
import ErgoEditor from '../BaseEditors/ErgoEditor';
import JsonEditor from '../BaseEditors/JsonEditor';

const CurrentEditor = (props) => {
  const { editor } = props;
  switch (editor) {
    case 'contractExampleText':
      return (<ContractExampleTextEditor />);
    case 'contractTemplate':
      return (<ContractTemplateEditor />);
    case 'clauseTemplateGrammar':
      return (<ClauseTemplateGrammarEditor />);
    case 'clauseExampleText':
      return (<ClauseExampleTextEditor />);
    case 'clauseModel':
      return (
        <ConcertoEditor />
      );
    case 'clauseLogic':
      return (
      <ErgoEditor />
      );
    case 'clauseMetadata':
      return (
        <JsonEditor />
      );
    default:
      return <ContractTemplateEditor />;
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ClauseTemplateGrammarEditor from '../ClauseTemplate/ClauseGrammarEditor';
import ClauseExampleTextEditor from '../ClauseTemplate/ClauseExampleTextEditor';
import ContractEditor from '../ContractEditor';
import ClauseModelEditor from '../ClauseTemplate/ClauseModelEditor';
import ClauseLogicEditor from '../ClauseTemplate/ClauseLogicEditor';
import ClauseMetadataEditor from '../ClauseTemplate/ClauseMetadataEditor';

const CurrentEditor = (props) => {
  const { editor } = props;
  switch (editor) {
    case 'contract':
      return (<ContractEditor />);
    case 'clauseTemplateGrammar':
      return (<ClauseTemplateGrammarEditor />);
    case 'clauseExampleText':
      return (<ClauseExampleTextEditor />);
    case 'clauseModel':
      return (<ClauseModelEditor />);
    case 'clauseLogic':
      return (<ClauseLogicEditor />);
    case 'clauseMetadata':
      return (<ClauseMetadataEditor />);
    default:
      return <ContractEditor />;
  }
};

CurrentEditor.propTypes = {
  editor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  editor: state.appState.editor,
});

export default connect(mapStateToProps)(CurrentEditor);

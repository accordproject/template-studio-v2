import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TextArea } from 'semantic-ui-react';
import { editClauseGrammarAction } from '../../actions/clauseTemplatesActions';

const EditorWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  };
  justify-self: center;
  width: 594px;
`;

const ClauseGrammarEditor = props => (
  <EditorWrapper>
    <TextArea
      onChange={(event, data) => props.onClauseGrammarChange(props.clauseTemplateid, data.value)}
      value={props.value}
      rows={20}
      style={{ width: 'inherit' }}
    />
  </EditorWrapper>
);

ClauseGrammarEditor.propTypes = {
  onClauseGrammarChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  clauseTemplateid: PropTypes.string,
};

const mapStateToProps = state => ({
  value: state.clauseTemplatesState[state.appState.id].grammar,
  clauseTemplateid: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  onClauseGrammarChange: (...args) => dispatch(editClauseGrammarAction(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseGrammarEditor));

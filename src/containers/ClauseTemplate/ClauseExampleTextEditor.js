import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TextArea } from 'semantic-ui-react';
import { editClauseSampleAction } from '../../actions/clauseTemplatesActions';

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

const ClauseExampleTextEditor = props => (
  <EditorWrapper>
    <TextArea
      onChange={(event, data) => props.onClauseSampleChange(props.clauseTemplateid, data.value)}
      value={props.value}
    />
  </EditorWrapper>
);

ClauseExampleTextEditor.propTypes = {
  onClauseSampleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  clauseTemplateid: PropTypes.string,
};

const mapStateToProps = state => ({
  value: state.clauseTemplatesState[state.appState.id].sampleText,
  clauseTemplateid: state.appState.id,
});

const mapDispatchToProps = dispatch => ({
  onClauseSampleChange: (...args) => dispatch(editClauseSampleAction(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseExampleTextEditor));

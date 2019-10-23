import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TextArea } from 'semantic-ui-react';
import { editClauseSampleAction } from '../../actions/clauseTemplatesActions';

const EditorWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: rgba(0,0,0,.25) rgba(0,0,0,.1);
  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  };
  justify-self: center;
  width: 594px;
`;

/**
 * A text editing component for clause template sample text
 * @param {*} props the properties for the component
 */
const ClauseExampleTextEditor = props => (
  <EditorWrapper>
    <TextArea
      onChange={(event, data) => props.onClauseSampleChange(props.clauseTemplateid, data.value)}
      value={props.value}
      rows={20}
      style={{ width: 'inherit' }}
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

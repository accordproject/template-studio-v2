import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadTemplateObjectAction } from '../../actions/templatesActions';

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
    <textarea
      onChange={props.onClauseExampleTextChange}
      value={props.value}
    />
  </EditorWrapper>
);

ClauseExampleTextEditor.propTypes = {
  onClauseExampleTextChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

const mapStateToProps = state => ({
  value: state.clauseTemplatesState[state.appState.id].sampleText,
});

const mapDispatchToProps = dispatch => ({
  loadTemplateObject: value => dispatch(loadTemplateObjectAction(value)),
  onClauseExampleTextChange: (event, data) => console.log('clauseTemplateEdited', data)
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseExampleTextEditor));

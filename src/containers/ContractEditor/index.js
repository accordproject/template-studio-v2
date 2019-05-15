import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { ContractEditor } from '@accordproject/cicero-ui';
import TempEditor from './TemporaryEditor';
import { loadTemplateObjectAction } from '../../actions/templatesActions';

const EditorWrapper = styled.div`
height: 700px;
bottom: 0;
left: 0;
overflow-y: auto;
&::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}
`;

const EditorContainer = props => (
  <EditorWrapper>
    <TempEditor
      loadTemplateObject={props.loadTemplateObject}
    />
  </EditorWrapper>
);

EditorContainer.propTypes = {
  loadTemplateObject: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadTemplateObject: value => dispatch(loadTemplateObjectAction(value)),
});

export default connect(null, mapDispatchToProps)(EditorContainer);

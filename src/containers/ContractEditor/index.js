import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ContractEditor } from '@accordproject/cicero-ui';
import { getTemplateFromUrlAction } from '../../actions/templatesActions';

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
    <ContractEditor
      getTemplateFromUrl={props.getTemplateFromUrl}
    />
  </EditorWrapper>
);

EditorContainer.propTypes = {
  getTemplateFromUrl: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getTemplateFromUrl: value => dispatch(getTemplateFromUrlAction(value)),
});

export default connect(null, mapDispatchToProps)(EditorContainer);

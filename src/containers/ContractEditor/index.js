import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ContractEditor } from '@accordproject/cicero-ui';
import { loadTemplateObjectAction } from '../../actions/templatesActions';
import { markdownChanged } from '../../actions/contractActions';
import parseClause from '../../utilities/parseClause';

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
      loadTemplateObject={props.loadTemplateObject}
      parseClause={(uri, text, clauseId) => parseClause(props.templateObjs, uri, text, clauseId)}
      onChange={props.onEditorChange}
      markdown={props.markdown}
      lockText={false}
    />
  </EditorWrapper>
);

EditorContainer.propTypes = {
  loadTemplateObject: PropTypes.func.isRequired,
  templateObjs: PropTypes.object,
  onEditorChange: PropTypes.func.isRequired,
  markdown: PropTypes.string,
};

const mapStateToProps = state => ({
  templateObjs: state.templatesState.templateObjs,
  markdown: state.contractState.markdown,
});

const mapDispatchToProps = dispatch => ({
  loadTemplateObject: value => dispatch(loadTemplateObjectAction(value)),
  onEditorChange: (value, markdown) => dispatch(markdownChanged(markdown))
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(EditorContainer));

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { ContractEditor } from '@accordproject/cicero-ui';
import TempEditor from './TemporaryEditor';
import { loadTemplateObjectAction } from '../../actions/templatesActions';
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
    <TempEditor
      loadTemplateObject={props.loadTemplateObject}
      parseClause={(uri, text) => parseClause(props.templateObjs, uri, text)}
    />
  </EditorWrapper>
);

EditorContainer.propTypes = {
  loadTemplateObject: PropTypes.func.isRequired,
  templateObjs: PropTypes.object,
};

const mapStateToProps = state => ({
  templateObjs: state.templatesState.templateObjs,
});

const mapDispatchToProps = dispatch => ({
  loadTemplateObject: value => dispatch(loadTemplateObjectAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);

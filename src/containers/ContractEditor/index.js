import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ContractEditor } from '@accordproject/cicero-ui';
import { loadTemplateObjectAction } from '../../actions/templatesActions';
import { documentEdited, removeFromContractAction } from '../../actions/contractActions';
import parseClause from '../../utilities/parseClause';
import { AP_THEME, CONTRACT_EDITOR } from '../App/themeConstants';

const EditorWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  };
  justify-self: center;
  width: 100%;
  height: inherit;
`;

const clauseProps = deleteFunc => ({
  CLAUSE_DELETE_FUNCTION: deleteFunc,
  HEADER_TITLE: ' - CLAUSE TEMPLATE',
});


const editorProps = {
  TOOLBAR_BACKGROUND: CONTRACT_EDITOR.TOOLBAR_BACKGROUND,
  BUTTON_BACKGROUND_INACTIVE: CONTRACT_EDITOR.BUTTON_BACKGROUND_INACTIVE,
  BUTTON_BACKGROUND_ACTIVE: CONTRACT_EDITOR.BUTTON_BACKGROUND_ACTIVE,
  BUTTON_BACKGROUND_HOVER: CONTRACT_EDITOR.BUTTON_BACKGROUND_HOVER,
  BUTTON_SYMBOL_INACTIVE: CONTRACT_EDITOR.BUTTON_SYMBOL_INACTIVE,
  BUTTON_SYMBOL_ACTIVE: CONTRACT_EDITOR.BUTTON_SYMBOL_ACTIVE,
  TOOLTIP_BACKGROUND: CONTRACT_EDITOR.TOOLTIP_BACKGROUND,
  TOOLTIP: CONTRACT_EDITOR.TOOLTIP,
  DROPDOWN_COLOR: AP_THEME.WHITE,
  DIVIDER: CONTRACT_EDITOR.DIVIDER,
  WIDTH: CONTRACT_EDITOR.WIDTH,
};

const EditorContainer = props => (
  <EditorWrapper>
    <ContractEditor
      clauseProps={clauseProps(props.removeFromContract)}
      loadTemplateObject={props.loadTemplateObject}
      parseClause={(uri, text, clauseId) => parseClause(props.templateObjs, uri, text, clauseId)}
      onChange={props.onEditorChange}
      value={props.value}
      lockText={false}
      editorProps={editorProps}
    />
  </EditorWrapper>
);

EditorContainer.propTypes = {
  loadTemplateObject: PropTypes.func.isRequired,
  templateObjs: PropTypes.object,
  onEditorChange: PropTypes.func.isRequired,
  value: PropTypes.object,
  removeFromContract: PropTypes.func,
};

const mapStateToProps = state => ({
  templateObjs: state.templatesState.templateObjs,
  value: state.contractState.slateValue,
});

const mapDispatchToProps = dispatch => ({
  loadTemplateObject: value => dispatch(loadTemplateObjectAction(value)),
  onEditorChange: (value, markdown) => dispatch(documentEdited(value, markdown)),
  removeFromContract: value => dispatch(removeFromContractAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(EditorContainer));

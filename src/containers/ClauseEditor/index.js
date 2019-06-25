import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ClauseEditor } from '@accordproject/cicero-ui';
import { loadTemplateObjectAction } from '../../actions/templatesActions';
import parseClause from '../../utilities/parseClause';

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

const ClauseEditorContainer = props => (
  <EditorWrapper>
    <ClauseEditor
      loadTemplateObject={props.loadTemplateObject}
      parseClause={(uri, text, clauseId) => parseClause(props.templateObjs, uri, text, clauseId)}
      onChange={props.onClauseTemplateChange}
      value={props.value}
      lockText={false}
    />
  </EditorWrapper>
);

ClauseEditorContainer.propTypes = {
  loadTemplateObject: PropTypes.func.isRequired,
  templateObjs: PropTypes.object,
  onClauseTemplateChange: PropTypes.func.isRequired,
  value: PropTypes.object,
};

const mapStateToProps = state => ({
  templateObjs: state.templatesState.templateObjs,
  value: state.contractState.slateValue,
});

const mapDispatchToProps = dispatch => ({
  loadTemplateObject: value => dispatch(loadTemplateObjectAction(value)),
  onClauseTemplateChange: (value, markdown) => console.log('clause template edited')
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ClauseEditorContainer));

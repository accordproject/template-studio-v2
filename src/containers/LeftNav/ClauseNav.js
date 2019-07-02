import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setCurrentEditorAction } from '../../actions/appActions';
import SubHeading from './SubHeadingBtn';

const ClauseNav = (props) => {
  const {
    clauseTemplateId, onClauseClick, src, showExpandedClause, setCurrentEditor
  } = props;

  const [clauseOpen, setClauseOpen] = useState(false);

  const ClauseNavOption = styled(SubHeading)`
    padding-left: 10px;
  `;

  return (
    <React.Fragment>
      <SubHeading
        onClick={() => {
          onClauseClick(clauseTemplateId);
          setClauseOpen(!clauseOpen);
        }}
      >
        <Icon name={clauseOpen ? 'caret down' : 'caret right'} style={{ textDecoration: 'none' }} />
        {src}
      </SubHeading>
      {
      showExpandedClause[clauseTemplateId]
      && <React.Fragment>
        <ClauseNavOption onClick={() => setCurrentEditor(clauseTemplateId, 'metadata')}>Metadata</ClauseNavOption>
        <ClauseNavOption onClick={() => setCurrentEditor(clauseTemplateId, 'clauseTemplate')}>Clause Template</ClauseNavOption>
        <ClauseNavOption onClick={() => setCurrentEditor(clauseTemplateId, 'exampleText')}>Example Text</ClauseNavOption>
        <ClauseNavOption onClick={() => setCurrentEditor(clauseTemplateId, 'model')}>Model</ClauseNavOption>
      </React.Fragment>
      }
    </React.Fragment>);
};

ClauseNav.propTypes = {
  clauseTemplateId: PropTypes.string.isRequired,
  onClauseClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  showExpandedClause: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modelFileContents: state.modelState.modelFiles['test.cto'],
  logicMockValue: state.logicState.logic,
  sampleMockValue: state.sampleState.sample,
});

const mapDispatchToProps = dispatch => ({
  setCurrentEditor: (clauseTemplateId, editor) => {
    dispatch(setCurrentEditorAction(clauseTemplateId, editor));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ClauseNav);

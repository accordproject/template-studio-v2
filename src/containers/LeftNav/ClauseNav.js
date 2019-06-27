import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import SubHeading from './SubHeadingBtn';

const ClauseNav = (props) => {
  const {
    id, onClauseClick, src, showExpandedClause, setCurrentEditor
  } = props;

  const [clauseOpen, setClauseOpen] = useState(false);

  const ClauseNavOption = styled(SubHeading)`
    padding-left: 10px;
  `;

  return (
    <React.Fragment>
      <SubHeading
        onClick={() => {
          onClauseClick(id);
          setClauseOpen(!clauseOpen);
        }}
      >
        <Icon name={clauseOpen ? 'caret down' : 'caret right'} style={{ textDecoration: 'none' }} />
        {src}
      </SubHeading>
      {
      showExpandedClause[id]
      && <React.Fragment>
        <ClauseNavOption onClick={() => setCurrentEditor('metadata')}>Metadata</ClauseNavOption>
        <ClauseNavOption onClick={() => setCurrentEditor('clause')}>Clause Template</ClauseNavOption>
        <ClauseNavOption onClick={() => setCurrentEditor('clause')}>Example Text</ClauseNavOption>
        <ClauseNavOption onClick={() => setCurrentEditor('model')}>Model</ClauseNavOption>
      </React.Fragment>
      }
    </React.Fragment>);
};

ClauseNav.propTypes = {
  id: PropTypes.string.isRequired,
  onClauseClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  showExpandedClause: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
};

export default ClauseNav;

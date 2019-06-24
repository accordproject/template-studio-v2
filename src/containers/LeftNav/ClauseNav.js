import React from 'react';
import PropTypes from 'prop-types';
import SubHeading from './SubHeadingBtn';

const ClauseNav = (props) => {
  const {
    id, onClauseClick, src, showExpandedClause, setCurrentEditor
  } = props;
  return (
    <React.Fragment>
      <SubHeading
        onClick={() => onClauseClick(id)}
      >
        {src}
      </SubHeading>
      {
      showExpandedClause[id]
      && <React.Fragment>
        <SubHeading onClick={() => setCurrentEditor('contract')}>> ClauseTemplate</SubHeading>
        <SubHeading onClick={() => setCurrentEditor('contract')}>> Example Text</SubHeading>
        <SubHeading onClick={() => setCurrentEditor('model')}>> Model</SubHeading>
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

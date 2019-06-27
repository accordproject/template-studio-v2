import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextButton from '../../components/TextButton';
import ClauseNav from './ClauseNav';
import SubHeading from './SubHeadingBtn';

const LeftSidebar = styled.div`
  background-color: #141F3C;
  height: inherit;
`;

const LeftNavWrapper = styled.div`
  padding: 15px;
  overflow-x: hidden;
  background-color: #141F3C;
`;

const FileOptions = styled.div`
  height: 36px;
  padding-left: 5px;
  background-color: #1E2D53;
`;

const FileOptionButtons = styled.button`
  margin: 8px;
  border: 0;
  background: transparent;
  font-size: #inherit;
  color: #fff;
  display: inline-block;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #19C6C7;
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: #19C6C7;
    text-decoration: underline;
  }
  &:active {
    color: #19C6C7;
    text-decoration: underline;
  }
`;

const NavWrapper = styled.div`
  padding-top: 10px;
`;

const Heading = styled.h2`
  color: #B9BCC4;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  text-decoration: none;
  text-align: left;
  margin: 10px;
`;

export const LeftNav = (props) => {
  const { setCurrentEditor, slateValue } = props;
  const [navVisible, setNavVisible] = useState(true);
  const [showExpandedClause, setShowExpandedClause] = useState({});

  const buttonRef = useRef(null);

  const handleClick = () => {
    setNavVisible(!navVisible);
    buttonRef.current.blur();
  };

  const onClauseClick = useCallback((id) => {
    setShowExpandedClause({ ...showExpandedClause, [id]: !showExpandedClause[id] });
  }, [showExpandedClause]);

  const clauseNodes = slateValue.toJSON().document.nodes.filter(node => node.type === 'clause');
  return (
    <LeftSidebar>
      <FileOptions>
        <FileOptionButtons>File</FileOptionButtons>
        <FileOptionButtons>Help</FileOptionButtons>
      </FileOptions>
      <LeftNavWrapper>
    <TextButton
      ref={buttonRef}
      onClick={handleClick}
      display={'block'}
    >
      { navVisible ? '< Hide Navigation' : 'Show Navigation >'}
    </TextButton>
    <NavWrapper>
      { navVisible && <React.Fragment>
        <Heading>CONTRACT</Heading>
        <SubHeading onClick={() => setCurrentEditor('contract')}>Contract Template</SubHeading>
        <SubHeading onClick={() => setCurrentEditor('contract')}>Contract Text</SubHeading>
        <br />
        <Heading>CLAUSES</Heading>
        {
          clauseNodes.map((clauseNode) => {
            const { clauseid, src } = clauseNode.data.attributes;
            return (
              <ClauseNav
                key={clauseid}
                showExpandedClause={showExpandedClause}
                onClauseClick={onClauseClick}
                id={clauseid}
                src={src}
                setCurrentEditor={setCurrentEditor}
              />);
          })
        }
      </React.Fragment> }
    </NavWrapper>
    </LeftNavWrapper>
  </LeftSidebar>
  );
};

LeftNav.propTypes = {
  slateValue: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  slateValue: state.contractState.slateValue,
});

export default connect(mapStateToProps)(LeftNav);

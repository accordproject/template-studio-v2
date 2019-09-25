import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Navigation } from '@accordproject/cicero-ui';

import { navigateToHeader } from '../../utilities/navigateClause';

import TextButton from '../../components/TextButton';
import ClauseNav from './ClauseNav';
import SubHeading from './SubHeadingBtn';
import { setCurrentEditorAction } from '../../actions/appActions';

import { AP_THEME, FILE_BAR, LEFT_NAV } from '../App/themeConstants';

const LeftSidebar = styled.div`
  background-color: ${AP_THEME.DARK_BLUE};
  height: inherit;
`;

const LeftNavWrapper = styled.div`
  padding: 15px;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: ${AP_THEME.DARK_BLUE};
  height: 100%;
`;

const FileOptions = styled.div`
  height: 36px;
  padding-left: 5px;
  background-color: ${FILE_BAR.BACKGROUND};
`;

const FileOptionButtons = styled.button`
  margin: 8px;
  border: 0;
  background: transparent;
  font-size: inherit;
  color: ${FILE_BAR.OPTION_BUTTONS};
  display: inline-block;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${FILE_BAR.OPTION_BUTTONS_HOVER};
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: ${FILE_BAR.OPTION_BUTTONS_HOVER};
    text-decoration: underline;
  }
  &:active {
    color: ${FILE_BAR.OPTION_BUTTONS_HOVER};
    text-decoration: underline;
  }
`;

const NavWrapper = styled.div`
  padding-top: 10px;
  height: 100%;
`;

const Heading = styled.h2`
  color: ${LEFT_NAV.HEADING};
  font-size: 0.87em;
  font-weight: 600;
  line-height: 14px;
  text-decoration: none;
  text-align: left;
  margin: 10px;
`;

export const LeftNav = (props) => {
  const { setCurrentEditor, slateValue, clauses } = props;
  const [navVisible, setNavVisible] = useState(true);
  const [showExpandedClause, setShowExpandedClause] = useState({});

  const buttonRef = useRef(null);

  const handleClick = () => {
    setNavVisible(!navVisible);
    buttonRef.current.blur();
  };

  const navigationPropsInput = {
    headers: props.headers,
    navigateHeader: navigateToHeader,
    navigationProps: {
      NAVIGATE_SWITCH_FILES_VISIBLE: false,
    }
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
      { navVisible ? 'Clause Navigation' : 'Contract Navigation'}
    </TextButton>
    <NavWrapper>

    {navVisible && <Navigation {...navigationPropsInput} />}
      { !navVisible && <React.Fragment>
        <Heading>CONTRACT</Heading>
        <SubHeading onClick={() => setCurrentEditor(null, 'contract')}>Contract</SubHeading>
        <br />
        <Heading>CLAUSES</Heading>
        { Object.keys(clauses).length
          ? clauseNodes.map((clauseNode) => {
            // clauseid is the id of the clause instance
            const { clauseid, src } = clauseNode.data.attributes;
            if (!clauses[clauseid]) return null;
            // clauseTemplateRef is the id of the clause template which the clause is an instance of
            const { clauseTemplateRef } = clauses[clauseid];
            return (
              <ClauseNav
                key={clauseid}
                showExpandedClause={showExpandedClause}
                onClauseClick={onClauseClick}
                clauseTemplateId={clauseTemplateRef}
                src={src}
                setCurrentEditor={setCurrentEditor}
              />);
          }) : null
        }
      </React.Fragment> }
    </NavWrapper>
    </LeftNavWrapper>
  </LeftSidebar>
  );
};

LeftNav.propTypes = {
  headers: PropTypes.array,
  slateValue: PropTypes.object.isRequired,
  setCurrentEditor: PropTypes.func.isRequired,
  clauses: PropTypes.object,
};

const mapStateToProps = state => ({
  slateValue: state.contractState.slateValue,
  clauses: state.contractState.clauses,
  headers: state.contractState.headers,
});

const mapDispatchToProps = dispatch => ({
  setCurrentEditor: (id, editor) => dispatch(setCurrentEditorAction(id, editor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);

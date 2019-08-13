import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Navigation } from '@accordproject/cicero-ui';

import TextButton from '../../components/TextButton';
import { setCurrentEditorAction } from '../../actions/appActions';

import { AP_THEME, FILE_BAR } from '../App/themeConstants';

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

export const LeftNav = (props) => {
  const [navVisible, setNavVisible] = useState(true);

  const buttonRef = useRef(null);

  const handleClick = () => {
    setNavVisible(!navVisible);
    buttonRef.current.blur();
  };

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

    {navVisible && <Navigation headers={props.headers} />}
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

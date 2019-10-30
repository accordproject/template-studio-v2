import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TemplateLibrary } from '@accordproject/cicero-ui';
import TextButton from '../../components/TextButton';
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import WhiteMenu from "../../../public/img/whiteMenu.svg";
import GreenMenu from "../../../public/img/greenMenu.svg";


import { getTemplatesAction, addNewTemplateAction } from '../../actions/templatesActions';
import { addToContractAction } from '../../actions/contractActions';

import { AP_THEME, TEMPLATE_LIBRARY } from '../App/themeConstants';

const RightSidebar = styled.div`
  background-color: ${AP_THEME.DARK_BLUE};
  height: inherit;
`;

const FileBar = styled.div`
  height: 36px;
  background-color: ${AP_THEME.DARK_BLUE_LIGHT};
`;

const TLWrapper = styled.div`
  width: 355px;
  position: relative;
  height: inherit;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  };
  display: grid;
  grid-template-rows: 18px auto;
`;

const ExpandWrapper = styled.div`
justify-self: end;
margin-top: 4em;
cursor:pointer;
background-color: white;
border: solid;
border-radius: 50%;
width: 2em;
height: 2em;
display: flex;
border-color: #62c6c8;
border-width: 0.1em;
&:hover {
  background-color: #62c6c8;
}
`;

const CollapseImg = styled.img`
  margin: auto;
  display: flex;
  height: 1em;
  width: 1em;
`;


const TemplatesBtn = styled(TextButton)`
  justify-self: end;
  z-index:999;
`;

const libraryProps = {
  HEADER_TITLE: TEMPLATE_LIBRARY.HEADER_TITLE,
  ACTION_BUTTON: TEMPLATE_LIBRARY.ACTION_BUTTON,
  ACTION_BUTTON_BG: TEMPLATE_LIBRARY.ACTION_BUTTON_BACKGROUND,
  ACTION_BUTTON_BORDER: TEMPLATE_LIBRARY.ACTION_BUTTON_BORDER,
  TEMPLATE_BACKGROUND: TEMPLATE_LIBRARY.TEMPLATE_BACKGROUND,
  TEMPLATE_TITLE: TEMPLATE_LIBRARY.TEMPLATE_TITLE,
  TEMPLATE_DESCRIPTION: TEMPLATE_LIBRARY.TEMPLATE_DESCRIPTION,
  TEMPLATES_HEIGHT: 'calc(100vh - 250px)',
};

const mockImport = () => { console.log('import'); };
const mockUpload = () => { console.log('upload'); };

export const LibraryComponent = (props) => {
  const [templatesVisible, setTemplatesVisible] = useState(true);
  const [expandButtonHovered, toggleExpandButtonHover] = useState(false);
  
  const [collapseButtonVisible, setCollapseButtonVisible] = useState(false);

  const buttonRef = useRef(null);

  const { fetchAPTemplates } = props;
  useEffect(() => {
    fetchAPTemplates();
  }, [fetchAPTemplates]);

  const handleClick = () => {
    toggleExpandButtonHover(false)
    setTemplatesVisible(!templatesVisible);
    buttonRef.current.blur();
  };

  return (
    <RightSidebar>
      <FileBar />
      <TLWrapper>
        <TemplatesBtn
          ref={buttonRef}
          onClick={handleClick}
          display={'block'}
        >
          { templatesVisible ? 
            <button onClick={() => setTemplatesVisible(false)}>Hide Templates</button> : 
            <ExpandWrapper
            onClick={() => handleClick()}
            onMouseEnter={() => toggleExpandButtonHover(true)}
            onMouseLeave={() => toggleExpandButtonHover(false)}
              >
              <CollapseImg 
              src={expandButtonHovered ? WhiteMenu : GreenMenu}
              />
              </ExpandWrapper>}
          
        </TemplatesBtn>
        <Sidebar.Pushable as={Segment} style={{background: "none"}}>
        {/* #131e3c */}
      <Sidebar
      style={{backgroundColor: `${AP_THEME.DARK_BLUE}`}}
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        // onHide={() => setTemplatesVisible(!templatesVisible)}
        vertical
        visible={templatesVisible}
        width='very wide'
      >
        <TemplateLibrary
          templates={props.templates}
          upload={mockUpload}
          import={mockImport}
          addTemp={props.addNewTemplate}
          addToCont={props.addToContract}
          libraryProps={libraryProps}

        />
      </Sidebar>
    </Sidebar.Pushable>
        {/* { templatesVisible && <TemplateLibrary
          templates={props.templates}
          upload={mockUpload}
          import={mockImport}
          addTemp={props.addNewTemplate}
          addToCont={props.addToContract}
          libraryProps={libraryProps}

        /> } */}
      </TLWrapper>
    </RightSidebar>
  );
};

LibraryComponent.propTypes = {
  templates: PropTypes.array.isRequired,
  uploadCTA: PropTypes.func,
  importTemplate: PropTypes.func,
  addToContract: PropTypes.func,
  addNewTemplate: PropTypes.func.isRequired,
  fetchAPTemplates: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  templates: state.templatesState.templatesAP,
});

const mapDispatchToProps = dispatch => ({
  fetchAPTemplates: () => dispatch(getTemplatesAction()),
  addNewTemplate: () => dispatch(addNewTemplateAction()),
  addToContract: value => dispatch(addToContractAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryComponent);

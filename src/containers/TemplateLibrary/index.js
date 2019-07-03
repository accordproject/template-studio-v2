import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TemplateLibrary } from '@accordproject/cicero-ui';
import TextButton from '../../components/TextButton';

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

const TemplatesBtn = styled(TextButton)`
  justify-self: end;
`;

const libraryProps = {
  HEADER_TITLE: TEMPLATE_LIBRARY.HEADER_TITLE,
  ACTION_BUTTON: TEMPLATE_LIBRARY.ACTION_BUTTON,
  ACTION_BUTTON_BG: TEMPLATE_LIBRARY.ACTION_BUTTON_BACKGROUND,
  ACTION_BUTTON_BORDER: TEMPLATE_LIBRARY.ACTION_BUTTON_BORDER,
  TEMPLATE_BACKGROUND: TEMPLATE_LIBRARY.TEMPLATE_BACKGROUND,
  TEMPLATE_TITLE: TEMPLATE_LIBRARY.TEMPLATE_TITLE,
  TEMPLATE_DESCRIPTION: TEMPLATE_LIBRARY.TEMPLATE_DESCRIPTION,
};

const mockImport = () => { console.log('import'); };
const mockUpload = () => { console.log('upload'); };

export const LibraryComponent = (props) => {
  const [templatesVisible, setTemplatesVisible] = useState(true);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setTemplatesVisible(!templatesVisible);
    buttonRef.current.blur();
  };

  const { fetchAPTemplates } = props;
  useEffect(() => {
    fetchAPTemplates();
  }, [fetchAPTemplates]);

  return (
    <RightSidebar>
      <FileBar />
      <TLWrapper>
        <TemplatesBtn
          ref={buttonRef}
          onClick={handleClick}
          display={'block'}
        >
          { templatesVisible ? 'Hide Clause Templates >' : '< Show Clause Templates'}
        </TemplatesBtn>
        { templatesVisible && <TemplateLibrary
          templates={props.templates}
          upload={mockUpload}
          import={mockImport}
          addTemp={props.addNewTemplate}
          addToCont={props.addToContract}
          libraryProps={libraryProps}

        /> }
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

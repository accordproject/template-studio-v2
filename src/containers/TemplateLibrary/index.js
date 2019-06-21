import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TemplateLibrary } from '@accordproject/cicero-ui';
import { Button } from 'semantic-ui-react';

import { getTemplatesAction, addNewTemplateAction, addToContractAction } from '../../actions/templatesActions';

const TLWrapper = styled.div`
width: 355px;
border: 2px solid #F9F9F9;
overflow-y: scroll;
&::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}
`;
const mockImport = () => { console.log('import'); };
const mockUpload = () => { console.log('upload'); };

export const LibraryComponent = (props) => {
  const [templatesVisible, setTemplatesVisible] = useState(true);
  const handleHideClick = () => setTemplatesVisible(false);
  const handleShowClick = () => setTemplatesVisible(true);

  useEffect(() => {
    props.fetchAPTemplates();
  }, []);

    return (
      <TLWrapper>
        <Button disabled={templatesVisible} onClick={handleShowClick}>
          Show Templates
        </Button>
        <Button disabled={!templatesVisible} onClick={handleHideClick}>
          Hide Templates
        </Button>
        { templatesVisible && <TemplateLibrary
          templates={props.templates}
          upload={mockUpload}
          import={mockImport}
          addTemp={props.addNewTemplate}
          addToCont={props.addToContract}
        /> }
      </TLWrapper>
    );
}

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

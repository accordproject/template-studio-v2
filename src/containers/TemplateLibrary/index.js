import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TemplateLibrary } from '@accordproject/cicero-ui';

const TLWrapper = styled.div`
height: 700px;
width: 485px;
position: fixed;
bottom: 0;
right: 0;
border: 2px solid #F9F9F9;
overflow-y: auto;
&::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}
`;

const LibraryComponent = props => (
    <TLWrapper>
        <TemplateLibrary
        templates={props.templatesArray}
        upload={props.uploadCTA}
        import={props.importTemplate}
        addTemp={props.addNewTemplate}
        addToCont={props.addToContract}
        />
    </TLWrapper>
);

LibraryComponent.propTypes = {
  templatesArray: PropTypes.array,
  uploadCTA: PropTypes.func,
  importTemplate: PropTypes.func,
  addNewTemplate: PropTypes.func,
  addToContract: PropTypes.func,
};

export default LibraryComponent;

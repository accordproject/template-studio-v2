import React from 'react';
import styled from 'styled-components';
import { ContractEditor } from '@accordproject/cicero-ui';

const EditorWrapper = styled.div`
height: 700px;
width: calc(100vw - 485px);
position: fixed;
bottom: 0;
left: 0;
border: 2px solid #F9F9F9;
overflow-y: auto;
&::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}
`;

const EditorComponent = () => (
    <EditorWrapper>
      <ContractEditor />
    </EditorWrapper>
);

export default EditorComponent;

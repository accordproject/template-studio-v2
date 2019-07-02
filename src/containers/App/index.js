import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

import Header from '../Header';
import LibraryContainer from '../TemplateLibrary';
// import ErrorContainer from '../Error';
import ErrorModalComponent from '../ErrorModal';
import LeftNavContainer from '../LeftNav';
import CurrentEditorContainer from '../CurrentEditor';

const AppWrapper = styled.div`
  height: 100%;
`;

const MainWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 37px auto;
`;

const ContentWrapper = styled.div`
  height: calc(100vh - 37px);
  display: grid;
  grid-template-columns: 204px auto 355px;
`;

export const App = () => (
    <AppWrapper>
      <ErrorModalComponent />
      <MainWrapper>
      <Header />
      <ContentWrapper>
        <LeftNavContainer />
        <CurrentEditorContainer />
        <LibraryContainer />
      </ContentWrapper>
      </MainWrapper>
    </AppWrapper>
);

export default App;

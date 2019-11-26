/* React */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Styling */
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import { CONTENT_BACKGROUND } from './themeConstants';

/* Components */
import Header from '../Header';
import LibraryContainer from '../TemplateLibrary';
import ErrorContainer from '../Error';
import ErrorModalComponent from '../ErrorModal';
import LeftNavContainer from '../LeftNav';
import CurrentEditorContainer from '../CurrentEditor';
import Welcome from '../Welcome';

const AppWrapper = styled.div`
  height: 100%;
`;

const MainWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 37px auto;
`;

const ContentWrapper = styled.div`
  background-color: ${CONTENT_BACKGROUND};
  height: calc(100vh - 37px);
  display: grid;
  grid-template-columns: 204px auto 355px;
  overflow-y: hidden;
`;

export const App = ({welcome}) => (
    <AppWrapper>
      <ErrorModalComponent />
      <MainWrapper>
        {welcome && <Welcome />}
        <Header />
        <ContentWrapper>
          <LeftNavContainer />
          <CurrentEditorContainer />
          <LibraryContainer />
        </ContentWrapper>
      </MainWrapper>
      <ErrorContainer />
    </AppWrapper>
);

const mapStateToProps = state => ({
  welcome: state.appState.welcome
});


export default connect(mapStateToProps)(App);

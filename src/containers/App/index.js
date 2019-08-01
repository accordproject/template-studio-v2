import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

import Header from '../Header';
import LibraryContainer from '../TemplateLibrary';
import ErrorContainer from '../Error';
import ErrorModalComponent from '../ErrorModal';
import LeftNavContainer from '../LeftNav';
import CurrentEditorContainer from '../CurrentEditor';

import { CONTENT_BACKGROUND } from './themeConstants';

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

/* These changes are to navigate PARSE ERRORS only */
/* Model errors will come later */

// This should be passed to the ContractEditor (or current)
// Adjust to find the node in the Slate DOM
const findClauseNode = (clauseId) => {
  const { value } = this.state;

  let clauseNode = null;
  value.document.nodes.forEach((n) => {
    if (n.type !== 'clause') return;
    if (n.data.get('clauseId') === clauseId) {
      clauseNode = n;
    }
  });
  return clauseNode;
};

// This should also be passed to the ContractEditor (or current)
// Will scroll to the node in the Slate DOM
const scrollToClause = (clauseNode) => {
  const el = document.querySelector(`[data-key="${clauseNode.key}"]`);
  el.scrollIntoView({ behavior: 'smooth' });
};

// This gets passed to error, when the file is clicked,
// this runs with the error's associated clauseId
const navigateToClauseError = (clauseId) => {
  const clauseNode = findClauseNode(clauseId);

  if (!clauseNode) {
    console.error('Error: clause not found');
    return;
  }
  scrollToClause(clauseNode);
};

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
      <ErrorContainer />
    </AppWrapper>
);

export default App;

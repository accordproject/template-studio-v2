import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  Button, Tab, Segment, Sidebar,
} from 'semantic-ui-react';

import { updateModelFileAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import { updateSampleMockAction } from '../../actions/sampleActions';
import Header from '../Header';
import LibraryContainer from '../TemplateLibrary';
import EditorContainer from '../ContractEditor';
import ConcertoEditor from '../ConcertoEditor';
import ErgoEditor from '../ErgoEditor';
import JsonEditor from '../JsonEditor';
import ErrorContainer from '../Error';
import ErrorModalComponent from '../ErrorModal';

const AppWrapper = styled.div`
  height: 100%;
`;

const MainWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 37px calc(100vh - 265px) 228px;
`;

const ContentWrapper = styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: auto 355px;
`;

export const App = (props) => { {
  const panes = [
    {
      menuItem: 'Text',
      render: () => (
        <EditorContainer />
      ),
    },
    {
      menuItem: 'Model',
      render: () => (
        <ConcertoEditor
          textValue={props.modelFileContents}
          handleSubmit={props.updateModelFile}
        />
      ),
    },
    {
      menuItem: 'Logic',
      render: () => (
        <ErgoEditor
          textValue={props.logicMockValue}
          handleSubmit={props.updateLogicMock}
        />
      ),
    },
    {
      menuItem: 'Metadata',
      render: () => (
        <JsonEditor
          jsonObject={props.sampleMockValue}
          handleSubmit={props.updateSampleMock}
        />
      ),
    },
  ];

    return (
      <AppWrapper>
        <ErrorModalComponent />
        <MainWrapper>
        <Header />
        <ContentWrapper>
          <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
          <LibraryContainer />
        </ContentWrapper>
        <ErrorContainer/>
        </MainWrapper>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  logicMockValue: PropTypes.string,
  modelFileContents: PropTypes.string,
  sampleMockValue: PropTypes.string,
  updateLogicMock: PropTypes.func.isRequired,
  updateModelFile: PropTypes.func.isRequired,
  updateSampleMock: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modelFileContents: state.modelState.modelFiles['test.cto'],
  logicMockValue: state.logicState.logic,
  sampleMockValue: state.sampleState.sample,
});

const mapDispatchToProps = dispatch => ({
  updateModelFile: value => dispatch(updateModelFileAction(value)),
  updateLogicMock: value => dispatch(updateLogicMockAction(value)),
  updateSampleMock: value => dispatch(updateSampleMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

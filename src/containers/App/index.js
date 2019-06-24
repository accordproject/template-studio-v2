import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { updateModelFileAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import { updateSampleMockAction } from '../../actions/sampleActions';
import Header from '../Header';
import LibraryContainer from '../TemplateLibrary';
import EditorContainer from '../ContractEditor';
import ConcertoEditor from '../ConcertoEditor';
import ErgoEditor from '../ErgoEditor';
import JsonEditor from '../JsonEditor';
// import ErrorContainer from '../Error';
import ErrorModalComponent from '../ErrorModal';
import LeftNavContainer from '../LeftNav';

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

export const App = (props) => {
  const [currentEditor, setCurrentEditor] = useState('contract');

  const renderEditor = () => {
    switch (currentEditor) {
      case 'contract':
        return (<EditorContainer />);
      case 'model':
        return (
          <ConcertoEditor
            textValue={props.modelFileContents}
            handleSubmit={props.updateModelFile}
          />
        );
      case 'logic':
        return (
        <ErgoEditor
          textValue={props.logicMockValue}
          handleSubmit={props.updateLogicMock}
        />
        );
      case 'metadata':
        return (
          <JsonEditor
            jsonObject={props.sampleMockValue}
            handleSubmit={props.updateSampleMock}
          />
        );
      default:
        return <EditorContainer />;
    }
  };

  return (
    <AppWrapper>
      <ErrorModalComponent />
      <MainWrapper>
      <Header />
      <ContentWrapper>
        <LeftNavContainer setCurrentEditor={setCurrentEditor} />
        {renderEditor()}
        <LibraryContainer />
      </ContentWrapper>
      </MainWrapper>
    </AppWrapper>
  );
};

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

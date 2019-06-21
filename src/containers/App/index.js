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

const MainWrapper = styled.div`
  padding: 10px;
`;

export const App = (props) => { {
  const [templatesVisible, setTemplatesVisible] = useState(false);
  const handleHideClick = () => setTemplatesVisible(false);
  const handleShowClick = () => setTemplatesVisible(true);

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
      <div>
        <ErrorModalComponent />
        <Header />
        <MainWrapper>
        <Button.Group>
          <Button disabled={templatesVisible} onClick={handleShowClick}>
            Show Templates
          </Button>
          <Button disabled={!templatesVisible} onClick={handleHideClick}>
            Hide Templates
          </Button>
        </Button.Group>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Segment} onHide={handleHideClick} visible={templatesVisible} animation='uncover' width='very wide' direction='right'>
          <Segment basic>
            <LibraryContainer />
          </Segment>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </MainWrapper>
        <ErrorContainer/>
      </div>
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

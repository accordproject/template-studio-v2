import React, { PureComponent } from 'react';
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

const MainWrapper = styled.div`
  padding: 10px;
`;

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templatesVisible: false,
    };
  }

  handleHideClick = () => this.setState({ templatesVisible: false });

  handleShowClick = () => this.setState({ templatesVisible: true });

  static propTypes = {
    logicMockValue: PropTypes.string,
    modelFileContents: PropTypes.string,
    sampleMockValue: PropTypes.string,
    updateLogicMock: PropTypes.func.isRequired,
    updateModelFile: PropTypes.func.isRequired,
    updateSampleMock: PropTypes.func.isRequired,
  };

  render() {
    const { templatesVisible } = this.state;

    // console.log(`PROPS: ${JSON.stringify(this.props, null, 2)}`);
    // console.log(`STATE: ${JSON.stringify(this.state, null, 2)}`);

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
            textValue={this.props.modelFileContents}
            handleSubmit={this.props.updateModelFile}
          />
        ),
      },
      {
        menuItem: 'Logic',
        render: () => (
          <ErgoEditor
            textValue={this.props.logicMockValue}
            handleSubmit={this.props.updateLogicMock}
          />
        ),
      },
      {
        menuItem: 'Metadata',
        render: () => (
          <JsonEditor
            jsonObject={this.props.sampleMockValue}
            handleSubmit={this.props.updateSampleMock}
          />
        ),
      },
    ];

    return (
      <div>
        <Header />
        <MainWrapper>
        <Button.Group>
          <Button disabled={templatesVisible} onClick={this.handleShowClick}>
            Show Templates
          </Button>
          <Button disabled={!templatesVisible} onClick={this.handleHideClick}>
            Hide Templates
          </Button>
        </Button.Group>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Segment} onHide={this.handleHideClick} visible={templatesVisible} animation='uncover' width='very wide' direction='right'>
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

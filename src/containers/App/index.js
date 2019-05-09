import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tile } from '@accordproject/cicero-ui';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  Button, Tab, Segment, Sidebar,
} from 'semantic-ui-react';

import { getTemplates, addNewTemplateAction } from '../../actions/templatesActions';
import { updateModelFileAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import { updateSampleMockAction } from '../../actions/sampleActions';
import Header from '../Header';
import LibraryComponent from '../TemplateLibrary';
import EditorComponent from '../ContractEditor';
import ModelEditorComponent from '../ModelEditor';
import ErgoEditorComponent from '../ErgoEditor';
import ErrorContainer from '../Error';

const mockUpload = () => { console.log('upload'); };
const mockImport = () => { console.log('import'); };
const mockAddTemp = () => { console.log('addTemp'); };
const mockAddToCont = (input) => { console.log('addToCont: ', input); };

const TileWrapper = styled.div`
display: flex;
width: 65vw;
border: 2px solid #F9F9F9;
`;

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      upload: mockUpload,
      import: mockImport,
      addTemp: mockAddTemp,
      addToCont: mockAddToCont,
      templatesVisible: false,
    };
  }

  handleHideClick = () => this.setState({ templatesVisible: false });

  handleShowClick = () => this.setState({ templatesVisible: true });

  componentDidMount() {
    this.props.fetchAPTemplates();
  }

  static propTypes = {
    addNewTemplate: PropTypes.func.isRequired,
    fetchAPTemplates: PropTypes.func.isRequired,
    logicMockValue: PropTypes.string,
    modelFileContents: PropTypes.string,
    sampleMockValue: PropTypes.string,
    templates: PropTypes.array,
    updateLogicMock: PropTypes.func.isRequired,
    updateModelFile: PropTypes.func.isRequired,
    updateSampleMock: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
  };

  render() {
    const { templatesVisible } = this.state;

    // console.log(`PROPS: ${JSON.stringify(this.props, null, 2)}`);
    // console.log(`STATE: ${JSON.stringify(this.state, null, 2)}`);

    const panes = [
      // {
      //   menuItem: 'Text',
      //   render: () => (
      //     <EditorComponent />
      //   ),
      // },
      {
        menuItem: 'Model',
        render: () => (
          <ModelEditorComponent textValue={this.props.modelFileContents} handleSubmit={this.props.updateModelFile}/>
        ),
      },
      {
        menuItem: 'Logic',
        render: () => (
          <ErgoEditorComponent textValue={this.props.logicMockValue} handleSubmit={this.props.updateLogicMock}/>
        ),
      },
    ];

    return (
      <div>
        <Header />
        <TileWrapper>
        <Tile
            handleSubmit={this.props.updateModelFile}
            header='Model'
            label='Model: '
            textValue={this.props.modelFileContents}
            textLabel='Current Model: '
          />
          <Tile
            handleSubmit={this.props.updateLogicMock}
            header='Logic'
            label='Logic Mock: '
            textValue={this.props.logicMockValue}
            textLabel='Current Logic Value: '
          />
          <Tile
            handleSubmit={this.props.updateSampleMock}
            header='Sample'
            label='Sample Mock: '
            textValue={this.props.sampleMockValue}
            textLabel='Current Sample Value: '
          />
        </TileWrapper>
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
            <LibraryComponent
                  templatesArray={this.props.templates}
                  uploadCTA={this.state.upload}
                  importTemplate={this.state.import}
                  addNewTemplate={this.props.addNewTemplate}
                  addToContract={this.state.addToCont}
                />
          </Segment>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <ErrorContainer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.templatesState.templatesAP,
  modelFileContents: state.modelState.modelFiles['test.cto'],
  logicMockValue: state.logicState.logic,
  sampleMockValue: state.sampleState.sample,
});

const mapDispatchToProps = dispatch => ({
  fetchAPTemplates: () => dispatch(getTemplates()),
  addNewTemplate: () => dispatch(addNewTemplateAction()),
  updateModelFile: value => dispatch(updateModelFileAction(value)),
  updateLogicMock: value => dispatch(updateLogicMockAction(value)),
  updateSampleMock: value => dispatch(updateSampleMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

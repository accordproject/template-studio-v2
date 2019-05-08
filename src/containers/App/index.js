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
import { updateModelMockAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import { updateSampleMockAction } from '../../actions/sampleActions';
import Header from '../Header';
import LibraryComponent from '../TemplateLibrary';
import EditorComponent from '../ContractEditor';
import ModelEditorComponent from '../ModelEditor';
import ErgoEditorComponent from '../ErgoEditor';

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

  handleSidebarHide = () => this.setState({ templatesVisible: false });

  componentDidMount() {
    this.props.fetchAPTemplates();
  }

  static propTypes = {
    addNewTemplate: PropTypes.func.isRequired,
    fetchAPTemplates: PropTypes.func.isRequired,
    logicMockValue: PropTypes.string,
    modelMockValue: PropTypes.string,
    sampleMockValue: PropTypes.string,
    templates: PropTypes.array,
    updateLogicMock: PropTypes.func.isRequired,
    updateModelMock: PropTypes.func.isRequired,
    updateSampleMock: PropTypes.func.isRequired,
  };

  render() {
    const { templatesVisible } = this.state;

    const panes = [
      {
        menuItem: 'Text',
        render: () => (
          <EditorComponent />
        ),
      },
      {
        menuItem: 'Model',
        render: () => (
          <ModelEditorComponent textValue={this.props.modelMockValue} handleSubmit={this.props.updateModelMock}/>
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
            handleSubmit={this.props.updateModelMock}
            header='Model'
            label='Model Mock: '
            textValue={this.props.modelMockValue}
            textLabel='Current Model Value: '
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
          <Sidebar as={Segment} onHide={this.handleSidebarHide} visible={templatesVisible} animation='uncover' width='very wide' direction='right'>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.templatesState.templatesAP,
  modelMockValue: state.modelState.model,
  logicMockValue: state.logicState.logic,
  sampleMockValue: state.sampleState.sample,
});

const mapDispatchToProps = dispatch => ({
  fetchAPTemplates: () => dispatch(getTemplates()),
  addNewTemplate: () => dispatch(addNewTemplateAction()),
  updateModelMock: value => dispatch(updateModelMockAction(value)),
  updateLogicMock: value => dispatch(updateLogicMockAction(value)),
  updateSampleMock: value => dispatch(updateSampleMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

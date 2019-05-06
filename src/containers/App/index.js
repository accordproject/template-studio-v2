import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TemplateLibrary } from '@accordproject/cicero-ui';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';

import { getTemplates, addNewTemplateAction } from '../../actions/templatesActions';
import { updateModelMockAction } from '../../actions/modelActions';
import { updateLogicMockAction } from '../../actions/logicActions';
import Header from '../Header';
import Tile from '../../components/Tile';

const mockUpload = () => { console.log('upload'); };
const mockImport = () => { console.log('import'); };
const mockAddTemp = () => { console.log('addTemp'); };
const mockAddToCont = (input) => { console.log('addToCont: ', input); };

const TLWrapper = styled.div`
  height: 700px;
  width: 485px;
  position: fixed;
  bottom: 0;
  right: 0;
  border: 2px solid #F9F9F9;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    background: transparent;
  }
`;

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      upload: mockUpload,
      import: mockImport,
      addTemp: mockAddTemp,
      addToCont: mockAddToCont,
    };
  }

  componentDidMount() {
    this.props.fetchAPTemplates();
  }

  static propTypes = {
    addNewTemplate: PropTypes.func.isRequired,
    fetchAPTemplates: PropTypes.func.isRequired,
    logicMockValue: PropTypes.string,
    modelMockValue: PropTypes.string,
    templates: PropTypes.array,
    updateModelMock: PropTypes.func.isRequired,
    updateLogicMock: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Header />
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
        <TLWrapper>
          <TemplateLibrary
            templates={this.props.templates}
            upload={this.state.upload}
            import={this.state.import}
            addTemp={this.props.addNewTemplate}
            addToCont={this.state.addToCont}
          />
        </TLWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.templatesState.templatesAP,
  modelMockValue: state.modelState.model,
  logicMockValue: state.logicState.logic,
});

const mapDispatchToProps = dispatch => ({
  fetchAPTemplates: () => dispatch(getTemplates()),
  addNewTemplate: () => dispatch(addNewTemplateAction()),
  updateModelMock: value => dispatch(updateModelMockAction(value)),
  updateLogicMock: value => dispatch(updateLogicMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

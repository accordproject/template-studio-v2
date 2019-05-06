import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TemplateLibrary } from '@accordproject/cicero-ui';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';

import { getTemplates, addNewTemplateAction } from '../../actions/templatesActions';
import { updateModelMockAction } from '../../actions/modelActions';
import Header from '../Header';
import ModelMock from '../ModelMock';

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
    templates: PropTypes.array,
    modelMockValue: PropTypes.string,
    fetchAPTemplates: PropTypes.func.isRequired,
    addNewTemplate: PropTypes.func.isRequired,
    updateModelMock: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Header />
        <ModelMock
            updateModelMock={this.props.updateModelMock}
            textValue={this.props.modelMockValue}
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
});

const mapDispatchToProps = dispatch => ({
  fetchAPTemplates: () => dispatch(getTemplates()),
  addNewTemplate: () => dispatch(addNewTemplateAction()),
  updateModelMock: value => dispatch(updateModelMockAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

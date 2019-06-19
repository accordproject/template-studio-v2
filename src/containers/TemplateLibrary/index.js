import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { TemplateLibrary } from '@accordproject/cicero-ui';

import { getTemplatesAction, addNewTemplateAction, addToContractAction } from '../../actions/templatesActions';

const TLWrapper = styled.div`
height: 100%;
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
const mockImport = () => { console.log('import'); };
const mockUpload = () => { console.log('upload'); };

export class LibraryComponent extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAPTemplates();
  }

  render() {
    return (
      <TLWrapper>
        <TemplateLibrary
          templates={this.props.templates}
          upload={mockUpload}
          import={mockImport}
          addTemp={this.props.addNewTemplate}
          addToCont={this.props.addToContract}
        />
      </TLWrapper>
    );
  }
}

LibraryComponent.propTypes = {
  templates: PropTypes.array.isRequired,
  uploadCTA: PropTypes.func,
  importTemplate: PropTypes.func,
  addToContract: PropTypes.func,
  addNewTemplate: PropTypes.func.isRequired,
  fetchAPTemplates: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  templates: state.templatesState.templatesAP,
});

const mapDispatchToProps = dispatch => ({
  fetchAPTemplates: () => dispatch(getTemplatesAction()),
  addNewTemplate: () => dispatch(addNewTemplateAction()),
  addToContract: value => dispatch(addToContractAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryComponent);

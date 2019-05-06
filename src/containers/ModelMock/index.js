import React from 'react';
import PropTypes from 'prop-types';
import Tile from '../../components/Tile';

export default class ModelMock extends React.PureComponent {
  static propTypes = {
    updateModelMock: PropTypes.func.isRequired,
    textValue: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    this.props.updateModelMock(value);
  }

  render() {
    return (
      <Tile
        handleSubmit={this.handleSubmit}
        header='Model'
        label='Model Mock: '
        textValue={this.props.textValue}
        textLabel='Current Model Value: '
      />
    );
  }
}

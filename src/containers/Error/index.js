import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

class ErrorComponent extends React.Component {
  static buildMessage(d, key) {
    let result = 'Unknown';

    if (d.fileLocation) {
      result = '';
      if (d.fileLocation[key].line) {
        result += `Line: ${d.fileLocation[key].line}`;
      }

      if (d.fileLocation[key].column) {
        result += ` Col: ${d.fileLocation[key].column}`;
      }
    }

    return result;
  }

  static buildStartLocation(d) {
    return ErrorComponent.buildMessage(d, 'start');
  }

  static buildEndLocation(d) {
    return ErrorComponent.buildMessage(d, 'end');
  }

  render() {
    const columns = [{
      Header: 'Type',
      accessor: 'type',
      width: 100,
    },
    {
      Header: 'Name',
      accessor: 'name',
      width: 200,
    },
    {
      Header: 'File',
      accessor: 'fileName',
      width: 100,
    },
    {
      id: 'startLocation',
      Header: 'Start Location',
      accessor: d => ErrorComponent.buildStartLocation(d),
      width: 100,
    },
    {
      id: 'endLocation',
      Header: 'End Location',
      accessor: d => ErrorComponent.buildEndLocation(d),
      width: 100,
    },
    {
      Header: 'Message',
      accessor: 'shortMessage',
      width: 600,
    },
    ];

    return (<ReactTable
          data={this.props.errors}
          pageSize={5}
          columns={columns}
        />);
  }

  static propTypes = {
    errors: PropTypes.array.isRequired,
  };
}

export default ErrorComponent;

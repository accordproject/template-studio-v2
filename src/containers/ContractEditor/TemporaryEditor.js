import React from 'react';

const url = 'https://templates.accordproject.org/archives/acceptance-of-delivery@0.11.1.cta';

class TemporaryEditor extends React.PureComponent {
  componentDidMount() {
    this.props.loadTemplateObject(url);
  }

  render() {
    console.log('parse result', this.props.parseClause(url, 'skdjkjhakdh'));
    return (
      <h3>hi</h3>
    );
  }
}

export default TemporaryEditor;

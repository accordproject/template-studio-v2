import React, { PureComponent } from 'react';

class TemplateStudio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      templates: []
    };
  }

  render() {
    return (
      <div>
        <p>Success!</p>
      </div>
    );
  }
}
export default TemplateStudio;
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
        <p>Hello There!</p>
      </div>
    );
  }
}
export default TemplateStudio;
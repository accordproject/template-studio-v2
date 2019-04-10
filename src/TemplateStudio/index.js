import React, { PureComponent } from 'react';
import TemplateLibrary from 'cicero-ui';

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
          <TemplateLibrary />
      </div>
    );
  }
}
export default TemplateStudio;
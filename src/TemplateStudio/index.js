import React, { PureComponent } from 'react';
import TemplateLibrary from 'cicero-ui';
import 'semantic-ui-css/semantic.min.css';
// import { connect } from 'react-redux';

// const action = type => store.dispatch({type})

const mockUpload = () => { console.log('upload'); };
const mockImport = () => { console.log('import'); };
const mockAddTemp = () => { console.log('addTemp'); };
const mockAddToCont = (input) => { console.log('addToCont: ', input); };


class TemplateStudio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      upload: mockUpload,
      import: mockImport,
      addTemp: mockAddTemp,
      templates: templateArray,
      addToCont: mockAddToCont
    };
  }

  render() {
    return (
      <div>
        <p>Success!</p>
        <TemplateLibrary
          // templates={this.state.templates}
          upload={this.state.upload}
          import={this.state.import}
          addTemp={this.state.addTemp}
          addToCont={this.state.addToCont} 
        />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     age: state.age
//   };
// };

// const mapDispachToProps = dispatch => {
//   return {
//     actionOne: () => dispatch({ type: "ACTION_ONE", value: 1 }),
//     actionTwo: () => dispatch({ type: "ACTION_TWO", value: 1 })
//   };
// };

export default TemplateStudio;
// connect(
//   mapStateToProps, 
//   mapDispachToProps
// )(TemplateStudio);
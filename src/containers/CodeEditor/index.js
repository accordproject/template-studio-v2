import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';

class CodeEditor extends MonacoEditor {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.textValue,
    };

    this.handleOnChange = this.onChange.bind(this);
    this.handleEditorDidMount = this.editorDidMount.bind(this);
    this.updateContent = debounce(1000, () => {
      console.log(`updateContent ${this.state.code}`);
      this.props.handleSubmit(this.state.code);
    });
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  onChange(newValue, e) {
    this.setState({ code: newValue });
    this.updateContent();
  }

  render() {
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <MonacoEditor
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.handleOnChange}
        editorDidMount={this.handleEditorDidMount}
      />
    );
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    textValue: PropTypes.string.isRequired,
  };
}

export default CodeEditor;

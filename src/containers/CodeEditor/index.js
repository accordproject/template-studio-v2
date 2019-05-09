import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import { CONCERTO_FORMAT, CONCERTO_THEME } from './concerto';

class CodeEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: props.textValue,
    };

    this.handleOnChange = this.onChange.bind(this);
    this.handleEditorDidMount = this.editorDidMount.bind(this);
    this.handleEditorWillMount = this.editorWillMount.bind(this);

    this.updateContent = debounce(1000, () => {
      console.log(`updateContent ${this.state.code}`);
      this.props.handleSubmit(this.state.code);
    });
  }

  editorWillMount(monaco) {
    monaco.languages.register({ id: 'concerto' });
    monaco.languages.setMonarchTokensProvider('concerto', CONCERTO_FORMAT);
    monaco.editor.defineTheme('concerto-light', CONCERTO_THEME);
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
    return (
      <MonacoEditor
        height="300"
        options={{
          minimap: {
            enabled: false,
          },
        }}
        language="concerto"
        theme="vs"
        value={code}
        onChange={this.handleOnChange}
        editorDidMount={this.handleEditorDidMount}
        editorWillMount={this.handleEditorWillMount}
      />
    );
  }

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    textValue: PropTypes.string.isRequired,
  };
}

export default CodeEditor;

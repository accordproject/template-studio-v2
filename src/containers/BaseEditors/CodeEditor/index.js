import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import PropTypes from 'prop-types';

/**
 * A code editing component which wraps the Monaco editor
 * @param {*} props the properties for the component
 */
function CodeEditor(props) {
  const [code, setCode] = useState(null);

  const editorWillMount = ((monaco) => {
    monaco.languages.register({ id: props.languageId });
    monaco.languages.setMonarchTokensProvider(props.languageId, props.languageFormat);
    monaco.editor.defineTheme(props.themeId, props.theme);
  });

  const editorDidMount = ((editor, monaco) => {
    editor.focus();
  });

  const onChange = (newValue, e) => {
    setCode(newValue);
    props.handleSubmit(newValue);
  };

  return (
    <MonacoEditor
      options={props.monacoOptions}
      language={props.languageId}
      theme={props.themeId}
      value={code || props.textValue}
      onChange={onChange}
      editorDidMount={editorDidMount}
      editorWillMount={editorWillMount}
    />);
}

CodeEditor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
  languageId: PropTypes.string.isRequired,
  languageFormat: PropTypes.object,
  themeId: PropTypes.string.isRequired,
  theme: PropTypes.object,
  monacoOptions: PropTypes.object,
  debounceInterval: PropTypes.number.isRequired,
};

export default CodeEditor;

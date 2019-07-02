import React from 'react';
import PropTypes from 'prop-types';
import CodeEditor from '../CodeEditor';
import { ERGO_FORMAT, ERGO_THEME } from './ergo';

/**
 * A code editing component for Ergo files
 * @param {*} props the properties for the component
 */
function ErgoEditor(props) {
  return (<CodeEditor
      handleSubmit={props.handleSubmit}
      textValue={props.textValue}
      languageId='ergo'
      languageFormat={ERGO_FORMAT}
      themeId='ergo-light'
      theme={ERGO_THEME}
      debounceInterval={1000}
    />);
}

ErgoEditor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
};

export default ErgoEditor;

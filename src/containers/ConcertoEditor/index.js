import React from 'react';
import PropTypes from 'prop-types';
import CodeEditor from '../CodeEditor';
import { CONCERTO_FORMAT, CONCERTO_THEME } from './concerto';

/**
 * A code editing component for Concerto files
 * @param {*} props the properties for the component
 */
function ConcertoEditor(props) {
  return (<CodeEditor
      handleSubmit={props.handleSubmit}
      textValue={props.textValue}
      languageId='concerto'
      languageFormat={CONCERTO_FORMAT}
      themeId='concerto-light'
      theme={CONCERTO_THEME}
      debounceInterval={1000}
    />);
}

ConcertoEditor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
};

export default ConcertoEditor;

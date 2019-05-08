import PropTypes from 'prop-types';
import CodeEditor from '../CodeEditor';

class ModelEditor extends CodeEditor {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    textValue: PropTypes.string.isRequired,
  };
}

export default ModelEditor;

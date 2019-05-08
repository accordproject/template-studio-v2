import PropTypes from 'prop-types';
import CodeEditor from '../CodeEditor';

class ErgoEditor extends CodeEditor {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    textValue: PropTypes.string.isRequired,
  };
}

export default ErgoEditor;

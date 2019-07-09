import React from 'react';
import PropTypes from 'prop-types';
import ReactJson from 'react-json-view';

/**
 * A code editing component for JSON files
 * @param {*} props the properties for the component
 */
function JsonEditor(props) {
  const onEdit = (evt) => {
    console.log(evt.updated_src);
    props.handleSubmit(evt.updated_src);
    return true;
  };

  const onDelete = (evt) => {
    console.log(evt.updated_src);
    props.handleSubmit(evt.updated_src);
    return true;
  };

  const onAdd = (evt) => {
    console.log(evt.updated_src);
    props.handleSubmit(evt.updated_src);
    return true;
  };

  return (
    <ReactJson
      onEdit={onEdit}
      onDelete={onDelete}
      onAdd={onAdd}
      src={props.jsonObject}
      theme="monokai"
    />
  );
}

JsonEditor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  jsonObject: PropTypes.object.isRequired,
};

export default JsonEditor;

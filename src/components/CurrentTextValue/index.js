import React from 'react';
import PropTypes from 'prop-types';

function CurrentTextValue(props) {
  return (
    <React.Fragment>
    <p><b>{props.textLabel}</b>{props.textValue}</p>
    </React.Fragment>
  );
}

CurrentTextValue.propTypes = {
  textValue: PropTypes.string,
  textLabel: PropTypes.string,
};

export default React.memo(CurrentTextValue);

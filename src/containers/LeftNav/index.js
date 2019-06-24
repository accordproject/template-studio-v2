import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextButton from '../../components/TextButton';

const LeftNavWrapper = styled.div`
`;

export const LeftNav = (props) => {
  const { setCurrentEditor, slateValue } = props;
  const [navVisible, setNavVisible] = useState(true);
  const buttonRef = useRef(null);

  const handleClick = () => {
    setNavVisible(!navVisible);
    buttonRef.current.blur();
  };

  return (
  <LeftNavWrapper>
    <TextButton
      ref={buttonRef}
      onClick={handleClick}
      display={'block'}
    >
      { navVisible ? '< Hide Navigation' : 'Show Navigation >'}
    </TextButton>
    { navVisible && <div>
      <h2>Contract</h2>
      <h3>Contract Template</h3>
      <br />
      <h2>Clauses</h2>
    </div> }
  </LeftNavWrapper>
  );
};

LeftNav.propTypes = {
  slateValue: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  slateValue: state.contractState.slateValue,
});

export default connect(mapStateToProps)(LeftNav);

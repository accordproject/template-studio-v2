import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextButton from '../../components/TextButton';

const LeftNavWrapper = styled.div`
  padding: 15px;
`;

const Heading = styled.h2`
  height: 14px;
  width: 136px;
  color: #B9BCC4;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
`;

const SubHeading = styled.p`
  height: 24px;
  width: 136px;
  color: #B9BCC4;
  font-size: 16px;
  line-height: 24px;
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
      <Heading>CONTRACT</Heading>
      <SubHeading>Contract Template</SubHeading>
      <SubHeading>Contract Text</SubHeading>
      <br />
      <Heading>CLAUSES</Heading>
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

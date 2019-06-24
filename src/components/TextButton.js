import styled, { css } from 'styled-components';

const TextButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: ${props => (props.fontSize ? props.fontSize : '#inherit')};
  color: ${props => (props.disabled ? '#B5BABE' : '#414F58')};
  display: ${props => (props.display ? props.display : 'inline-block')};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #0361DE;
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: #3089FF;
    text-decoration: underline;
  }
  &:active {
    color: #3089FF;
    text-decoration: underline;
  }

  ${props => props.urgent && css`
    color: ${props.disabled ? '#B5BABE' : '#BA0000'};
    &:hover {
      color: #F74747;
      text-decoration: underline;
    }
    &:focus {
      outline: none;
      color: #F74747;
      text-decoration: underline;
    }
    &:active {
      color: #F74747;
      text-decoration: underline;
    }
  `};

  ${props => props.lowContrast && css`
    color: ${props.disabled ? '#B5BABE' : '#949CA2'};
    &:hover {
      color: #414F58;
      text-decoration: underline;
    }
    &:active {
      color: #414F58;
      text-decoration: underline;
    }
  `};
`;

export default TextButton;

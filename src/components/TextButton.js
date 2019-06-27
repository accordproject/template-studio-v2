import styled from 'styled-components';

const TextButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: ${props => (props.fontSize ? props.fontSize : '#inherit')};
  color: ${props => (props.disabled ? '#B5BABE' : '#B9BCC4')};
  display: ${props => (props.display ? props.display : 'inline-block')};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #FFFFFF;
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: #FFFFFF;
    text-decoration: underline;
  }
  &:active {
    color: #FFFFFF;
    text-decoration: underline;
  }
`;

export default TextButton;

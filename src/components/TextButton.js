import styled from 'styled-components';

import { AP_THEME } from '../containers/App/themeConstants';

const TextButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: ${props => (props.fontSize ? props.fontSize : 'inherit')};
  color: ${props => (props.disabled ? '#B5BABE' : AP_THEME.GRAY)};
  display: ${props => (props.display ? props.display : 'inline-block')};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${AP_THEME.WHITE};
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    color: ${AP_THEME.WHITE};
    text-decoration: underline;
  }
  &:active {
    color: ${AP_THEME.WHITE};
    text-decoration: underline;
  }
`;

export default TextButton;

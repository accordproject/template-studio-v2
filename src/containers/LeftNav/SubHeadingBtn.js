import styled from 'styled-components';
import TextButton from '../../components/TextButton';
import { AP_THEME } from '../App/themeConstants';

const SubHeadingBtn = styled(TextButton)`
  color: ${AP_THEME.GRAY};
  font-size: 16px;
  line-height: 24px;
  text-decoration: none;
  text-align: left;
  margin: 6px;
  display: block;
  padding-left: 10px;
`;

export default SubHeadingBtn;

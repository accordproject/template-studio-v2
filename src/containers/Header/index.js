import React from 'react';
import styled from 'styled-components';

import image from '../../../public/img/logo.png';
import logo from '../../../public/img/github.png';

import { AP_THEME } from '../App/themeConstants';

const HeaderWrapper = styled.div`
  display: flex;
  height: 37px;
  width: 100%;
  background-color: ${AP_THEME.DARK_BLUE};
  color: white;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  padding-right: 20px;
  text-align: center;
`;

const HeaderImage = styled.img`
  height: 27px;
  margin-top: 5px;
  margin-left: 15px;
`;

const HeaderLink = styled.a`
  font-size: 17px;
  color: #fff;
  position: absolute;
  top: 10px;
  right: 12px;
  transition: all 0.2s;

  &:hover {
    color: rgb(25, 198, 199);
  }
`;

const HeaderLogo = styled.img`
  position: absolute;
  top: -6px;
  right: 176px;
  height: 28px;
  transition: all 0.2s;
`;
const Header = () => (
  <HeaderWrapper>
    <a href="https://www.accordproject.org">
      <HeaderImage src={image} alt="Accord Project" />
    </a>

    <HeaderTitle>Template Studio</HeaderTitle>

    <HeaderLink
      title="Please report issues and contribute improvements on GitHub!"
      href="https://github.com/accordproject/template-studio-v2"
      target="_blank"
    >
      <HeaderLogo src={logo} alt="Github logo" /> Contribute on Github
    </HeaderLink>
  </HeaderWrapper>
);

export default Header;

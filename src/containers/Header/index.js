import React from 'react';
import styled from 'styled-components';

import image from '../../../public/img/logo.png';
import Logo from '../../../public/img/github.svg';

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
  top: 1px;
  right: 22px;
  transition: all 0.2s;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  svg {
    margin-bottom 2px;
    margin-right: 4px;
    height: 20px;
    transition: all 0.2s;
    fill: #fff;
  }
  &:hover {
    svg {
      fill: rgb(25, 198, 199);
    }
    color: rgb(25, 198, 199);
  }
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
      <Logo /> Contribute on Github
    </HeaderLink>
  </HeaderWrapper>
);

export default Header;

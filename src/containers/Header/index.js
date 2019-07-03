import React from 'react';
import styled from 'styled-components';

import image from '../../../public/img/logo.png';

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

const Header = () => (
    <HeaderWrapper>
            <a href="https://www.accordproject.org">
                <HeaderImage src={image} alt="Accord Project" />
            </a>
        <HeaderTitle>Template Studio</HeaderTitle>
    </HeaderWrapper>
);

export default Header;

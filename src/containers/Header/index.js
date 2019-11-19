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
    justify-content:space-between;
    padding: 0 15px;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    padding-right: 20px;
    text-align: center;
`;

const HeaderLeft = styled.div`
    display: flex;
`;

const HeaderImage = styled.img`
    height: 27px;
`;


const HeaderLink = styled.a`
    display:flex;
    color: white;
    align-items: center;
`;
const Header = () => (
    <HeaderWrapper>
        <HeaderLeft>
            <HeaderLink href="https://www.accordproject.org">
                    <HeaderImage src={image} alt="Accord Project" />
            </HeaderLink>
            <HeaderTitle>Template Studio</HeaderTitle> 
        </HeaderLeft>
        <HeaderLink href="https://github.com/accordproject/template-studio-v2" className="github-link"><i class="fa fa-github"></i>Contribute on Github</HeaderLink>
    
    </HeaderWrapper>
);

export default Header;

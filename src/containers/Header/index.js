import React from 'react';
import styled from 'styled-components';

import image from '../../../public/img/logo.png';

const HeaderWrapper = styled.div`
    display: flex;
    height: 37px;
    width: 100vw;
    background-color: #1B1C1C;
    color: white;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    padding-right: 20px;
    text-align: center;
    font-weight: bold;
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

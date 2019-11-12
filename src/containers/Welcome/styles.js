import React, { createElement } from 'react';
import styled from 'styled-components';


export const WelcomeBlurBackground = styled.div`
        width: 100vw;
        height:100vh;
        background: rgba(0,0,0,0.6);
        position:absolute;
        z-index:10;
`;

export const WelcomeWrapper = styled.div`
        width: 900px;
        height: 560px;
        background: #ffffff;
        border-radius:10px;
        border: 1px solid rgba(13,28,121,0.1);
        margin: 105px auto;
        padding: 30px 10px;
        text-align:center;
`;

export const WelcomeHeader = styled.h1`
        font-size:45px;
        color: #050C40;
        font-family: Graphik;
        line-height: 60px;	
        font-weight:normal;
`;

export const WelcomeText = styled.p`
        color: rgba(5,12,64,0.6);
        font-family: Graphik;
        font-size: 16px;
        line-height: 31px;
        margin:25px auto 30px;
        width:700px;
`;

export const WelcomeHeaderSecondary = styled.h1`
        color: #050C40;
        font-family: Graphik;
        font-size: 23px;
        font-weight: 550;
        line-height: 33px;
`;

const WelcomeButtonTag = ({className, onClick, text}) => (
        <button className={className} onClick={onClick}>{text}</button>
);

const WelcomeButtonStyled = styled(WelcomeButtonTag)`
        height: 45px;
        width: 216px;
        border-radius: 22.5px;
        background-color: #19C6C7;
        display:inline-block;
        margin: 0 15px;
        font-size:15px;
        color:#050C40;
        font-family:Graphik;
        font-weight: 600;
        line-height: 17px;
        text-align: center;
        border: 2px solid rgba(25,198,199);
        cursor: pointer;
        transition: color .25s cubic-bezier(.25,.46,.45,.94),background-color .25s cubic-bezier(.25,.46,.45,.94),border-color .25s cubic-bezier(.25,.46,.45,.94);
        &:hover{
            background-color: #fff;

        }
        &:focus{
                outline: none;
            }
`;

export const WelcomeButton = ({onClick, text}) => createElement(
        WelcomeButtonStyled,
        {
                onClick,
                text
        }
);

export const WelcomeLink = styled.a`
        color: #19c6c7;
        text-decoration: none;
        font-weight: 500;
        font-style: normal;
        transition: color .25s cubic-bezier(.25,.46,.45,.94);
        font-family: Graphik,Helvetica,Arial,sans-serif;
        &:hover{
            color: #050c40;
        }
`;

const WelcomeSearchTag = ({ className, onChange, value }) => (
    <input className={className} type="text" onChange={(e) => onChange(e.target.value)} placeholder='Template Name' value={value}></input>
);

const WelcomeSearchStyled = styled(WelcomeSearchTag)`
            height: 45px;
            width: 332px;
            border: 2px solid #19C6C7;
            border-radius: 22.5px;
            padding:14px 18px;
            color: rgba(5,12,64,0.6);
            font-family: Graphik;
            font-size: 15px;
            line-height: 17px;
            margin: 0px auto 10px auto;
            &:focus{
                outline: none;
            }
            background: url('../../../assets/SearchAlternate.svg');
            background-repeat:no-repeat;
            background-position: 20px 300px;
`;

export const WelcomeSearch = ({onChange, value}) => createElement(
    WelcomeSearchStyled,
    {
        onChange,
        value
    }
);


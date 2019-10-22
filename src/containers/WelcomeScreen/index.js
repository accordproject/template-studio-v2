import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { toggleWelcomeScreen } from '../../actions/appActions';

const WelcomeScreenBlurBackground = styled.div`
        width: 100vw;
        height:100vh;
        background: rgba(0,0,0,0.6);
        position:absolute;
        z-index:10;
`;

const WelcomeScreenWrapper = styled.div`
        width: 900px;
        height: 560px;
        background: #ffffff;
        border-radius:10px;
        border: 1px solid rgba(13,28,121,0.1);
        margin: 105px auto;
        padding: 30px 10px;
        text-align:center;
`;

const WelcomeScreenHeader = styled.h1`
        font-size:45px;
        color: #050C40;
        font-family: Graphik;
        line-height: 60px;	
        font-weight:normal;
`;

const WelcomeScreenTextContent = styled.p`
        color: rgba(5,12,64,0.6);
        font-family: Graphik;
        font-size: 16px;
        line-height: 31px;
        margin:25px auto 30px;
        width:700px;
`;

const WelcomeScreenHeaderSecondary = styled.h2`
        color: #050C40;
        font-family: Graphik;
        font-size: 23px;
        font-weight: 500;
        line-height: 33px;
`;

const WelcomeScreenFromScratchButton = styled.button`
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
        border:none;
        cursor: pointer;
`;

const WelcomeScreenSearch = ({ className }) => (
    <input className={className} type="text" value="Template Name"></input>
);

const WelcomeScreenSearchStyled = styled(WelcomeScreenSearch)`
        height: 45px;
        width: 332px;
        border: 2px solid #19C6C7;
        border-radius: 22.5px;
        padding:14px 18px;
        color: rgba(5,12,64,0.6);
        font-family: Graphik;
        font-size: 15px;
        line-height: 17px;
        margin: 10px auto 15px;
`;

const WelcomeScreen = ({toggleWelcomeScreen}) => {
  return (
      <WelcomeScreenBlurBackground>
          <WelcomeScreenWrapper>
            <WelcomeScreenHeader>
                Welcome to Template Studio
            </WelcomeScreenHeader>
            <WelcomeScreenTextContent>
                The Accord Project Template Studio allows you to create a template from scratch, or create a 
                new template based off of any template in the Accord Project Template Library. See what makes 
                smart legal contracts tick without needing to download any developer tools. <br/>
                <a style={{color: 'rgba(5,12,64,0.6)', textDecoration: 'underline'}}>Learn how to create your own templates</a>
            </WelcomeScreenTextContent>
            <WelcomeScreenHeaderSecondary>
                Start from an existing template
            </WelcomeScreenHeaderSecondary>
            <WelcomeScreenSearchStyled>

            </WelcomeScreenSearchStyled>
            <WelcomeScreenHeaderSecondary>
                Start from scratch
            </WelcomeScreenHeaderSecondary>
            <WelcomeScreenFromScratchButton onClick={() => toggleWelcomeScreen(false)}>
                New Contract Template
            </WelcomeScreenFromScratchButton>
            <WelcomeScreenFromScratchButton onClick={() => toggleWelcomeScreen(false)}>
                New Clause Template
            </WelcomeScreenFromScratchButton>
          </WelcomeScreenWrapper>
      </WelcomeScreenBlurBackground> 
  );
};

WelcomeScreen.propTypes = {
    toggleWelcomeScreen: PropTypes.func.isRequired,
    welcomeScreen: PropTypes.boolean,
};

const mapStateToProps = state => ({
    welcomeScreen: state.appState.welcomeScreen,
});

const mapDispatchToProps = dispatch => ({
    toggleWelcomeScreen: toggle => dispatch(toggleWelcomeScreen(toggle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

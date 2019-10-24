import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleWelcome, changeWelcomeSearch } from '../../actions/appActions';

import { WelcomeBlurBackground, WelcomeWrapper, WelcomeHeader, WelcomeText, WelcomeHeaderSecondary, WelcomeButton, WelcomeLink, WelcomeSearch} from './styles';



const Welcome = ({welcomeSearch, changeWelcomeSearch, toggleWelcome}) => {
  return (
      <WelcomeBlurBackground>
          <WelcomeWrapper>
            <WelcomeHeader>
                Welcome to Template Studio
            </WelcomeHeader>
            <WelcomeText>
                The Accord Project Template Studio allows you to create a template from scratch, or create a 
                new template based off of any template in the Accord Project Template Library. See what makes 
                smart legal contracts tick without needing to download any developer tools. <br/>
                <WelcomeLink href='https://docs.accordproject.org/docs/accordproject.html'>Learn how to create your own templates</WelcomeLink>
            </WelcomeText>
            <WelcomeHeaderSecondary>
                Start from an existing template
            </WelcomeHeaderSecondary>
            <WelcomeSearch value={welcomeSearch} onChange={changeWelcomeSearch}>
            </WelcomeSearch>
            <WelcomeHeaderSecondary>
                Start from scratch
            </WelcomeHeaderSecondary>
            <WelcomeButton onClick={() => toggleWelcome(false)}>
                New Contract Template
            </WelcomeButton>
            <WelcomeButton onClick={() => toggleWelcome(false)}>
                New Clause Template
            </WelcomeButton> 
          </WelcomeWrapper>
      </WelcomeBlurBackground> 
  );
};

Welcome.propTypes = {
    toggleWelcome: PropTypes.func.isRequired,
    welcome: PropTypes.boolean,
};

const mapStateToProps = state => ({
    welcomeSearch: state.appState.welcomeSearch,
});

const mapDispatchToProps = dispatch => ({
    toggleWelcome: toggle => dispatch(toggleWelcome(toggle)),
    changeWelcomeSearch: value => dispatch(changeWelcomeSearch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { Search, Label } from 'semantic-ui-react';

import { toggleWelcome, changeWelcomeSearchValue, changeWelcomeSearchResults, toggleWelcomeSearchLoading} from '../../actions/appActions';
import { getTemplatesAction } from '../../actions/templatesActions';
import { addToContractAction } from '../../actions/contractActions';

import { WelcomeBlurBackground, WelcomeWrapper, WelcomeHeader, WelcomeText, WelcomeHeaderSecondary, WelcomeButton, WelcomeLink, WelcomeSearch} from './styles';

class Welcome extends Component{
    componentDidMount(){
        this.props.fetchAPTemplates();
    }
    resultRenderer = ({ name, version }) => <Label content={`${name}@${version}`} />

    onChangeSearch = (e, {value}) => {
        this.props.changeWelcomeSearchValue(value);
        this.filterResults(value);
    };
    filterResults = (filter) => {
        this.props.toggleWelcomeSearchLoading(true);
        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(filter), 'i');
            const isMatch = (result) => re.test(result.name);
            this.props.toggleWelcomeSearchLoading(false);
            this.props.changeWelcomeSearchResults( _.filter(this.props.templates, isMatch));

        }, 150);
    }

    onFocusSearch = () => {
        this.filterResults(this.props.searchValue);
    }
    onSelectSearch = (e, {result}) => {
        this.props.addToContract(result.uri);
        setTimeout(() => {
            this.props.toggleWelcome(false);
        }, 500);
        
    };
    render(){
        return (
            <WelcomeBlurBackground>
                <WelcomeWrapper className="welcome">
                  <WelcomeHeader>
                      Welcome to Template Studio
                  </WelcomeHeader>
                  <WelcomeText>
                      The Accord Project Template Studio allows you to create a template from scratch, or create a 
                      new template based off of any template in the Accord Project Template Library. See what makes 
                      smart legal contracts tick without needing to download any developer tools. <br/>
                      <WelcomeLink href='https://docs.accordproject.org/docs/tutorial-latedelivery.html'>Learn how to create your own templates</WelcomeLink>
                  </WelcomeText>
                  <WelcomeHeaderSecondary>
                      Start from an existing template
                  </WelcomeHeaderSecondary>
                  <Search 
                        loading={this.props.isLoading}
                        onSearchChange={this.onChangeSearch}
                        results={this.props.results}
                        value={this.props.searchValue}
                        resultRenderer={this.resultRenderer}
                        minCharacters={0}
                        onFocus={this.onFocusSearch}
                        onResultSelect = {this.onSelectSearch}
                  />
                  <WelcomeHeaderSecondary>
                      Start from scratch
                  </WelcomeHeaderSecondary>
                  <WelcomeButton text='New Contract Template' onClick={() => this.props.toggleWelcome(false)}>
                  </WelcomeButton>
                  <WelcomeButton text='New Clause Template' onClick={() => this.props.toggleWelcome(false)}>
                  </WelcomeButton> 
                </WelcomeWrapper>
            </WelcomeBlurBackground> 
        );
    }
}; 
Welcome.propTypes = {
    changeWelcomeSearchValue: PropTypes.func,
    changeWelcomeSearchResults: PropTypes.func,
    toggleWelcomeSearchLoading: PropTypes.func,
    toggleWelcome: PropTypes.func,
    searchValue: PropTypes.string,
    isLoading: PropTypes.boolean,
    results: PropTypes.array,

};

const mapStateToProps = state => ({
    searchValue: state.appState.welcome.searchValue,
    isLoading: state.appState.welcome.isLoading,
    results: state.appState.welcome.results,
    templates: state.templatesState.templatesAP,
});

const mapDispatchToProps = dispatch => ({
    toggleWelcome: toggle => dispatch(toggleWelcome(toggle)),
    changeWelcomeSearchValue: value => dispatch(changeWelcomeSearchValue(value)),
    changeWelcomeSearchResults: results => dispatch(changeWelcomeSearchResults(results)),
    toggleWelcomeSearchLoading: loading => dispatch(toggleWelcomeSearchLoading(loading)),
    addToContract: value => dispatch(addToContractAction(value)),
    fetchAPTemplates: () => dispatch(getTemplatesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

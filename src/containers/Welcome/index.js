import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TemplateLibrary } from '@accordproject/cicero-core';
import * as ciceroPackageJson from '@accordproject/cicero-core/package.json';


import { Search, Label } from 'semantic-ui-react';

import { toggleWelcome, changeWelcomeSearchValue, changeWelcomeSearchResults, toggleWelcomeSearchLoading} from '../../actions/appActions';

import { WelcomeBlurBackground, WelcomeWrapper, WelcomeHeader, WelcomeText, WelcomeHeaderSecondary, WelcomeButton, WelcomeLink, WelcomeSearch} from './styles';

const ciceroVersion = ciceroPackageJson.version;

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            templates: []
        };
    }
    loadTemplateLibrary = () => {
        const templateLibrary = new TemplateLibrary();
        const promisedIndex =
              templateLibrary.getTemplateIndex({ latestVersion: true, ciceroVersion: '0.20.1' });
        return promisedIndex.then((templateIndex) => {
          const templates = [];
          for (const t in templateIndex) {
            if (Object.prototype.hasOwnProperty.call(templateIndex, t)) {
              templates.push({ key: t, value: `ap://${t}#hash`, text: t });
            }
          }
          this.setState({
              templates: templates
          });
        });
    }
    resultRenderer = ({ text }) => <Label content={text} />
    onChangeSearch = (e, {value}) => {
        this.props.toggleWelcomeSearchLoading(true);
        this.props.changeWelcomeSearchValue(value);
        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(value), 'i');
            const isMatch = (result) => re.test(result.text);
            this.props.toggleWelcomeSearchLoading(false);
            this.props.changeWelcomeSearchResults( _.filter(this.state.templates, isMatch));
        }, 300)
    };
    componentDidMount(){
        this.loadTemplateLibrary().then(() => {
            console.log('done');
        });
    }
    render(){
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
                  <Search 
                        loading={this.props.isLoading}
                        onSearchChange={this.onChangeSearch}
                        results={this.props.results}
                        value={this.props.searchValue}
                        resultRenderer={this.resultRenderer}
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
    results: state.appState.welcome.results
});

const mapDispatchToProps = dispatch => ({
    toggleWelcome: toggle => dispatch(toggleWelcome(toggle)),
    changeWelcomeSearchValue: value => dispatch(changeWelcomeSearchValue(value)),
    changeWelcomeSearchResults: results => dispatch(changeWelcomeSearchResults(results)),
    toggleWelcomeSearchLoading: loading => dispatch(toggleWelcomeSearchLoading(loading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

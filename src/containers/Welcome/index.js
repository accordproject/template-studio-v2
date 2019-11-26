import _ from 'lodash';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Search, Label } from 'semantic-ui-react';

import { toggleWelcome } from '../../actions/appActions';
import { getTemplatesAction } from '../../actions/templatesActions';
import { addToContractAction } from '../../actions/contractActions';

import { WelcomeBlurBackground, WelcomeWrapper, WelcomeHeader, WelcomeText, WelcomeHeaderSecondary, WelcomeButton, WelcomeLink, WelcomeSearch} from './styles';

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchValue: '',
            results: [],
            isLoading: false,
        };
    }
    componentDidMount(){
        this.props.fetchAPTemplates();
    }
    resultRenderer = ({ name, version }) => <Label content={`${name}@${version}`} />

    onChangeSearch = (e, {value}) => {
        this.setState({searchValue: value});
        this.filterResults(value);
    };
    filterResults = (filter) => {
        this.setState({isLoading: true});
        setTimeout(() => {
            const re = new RegExp(_.escapeRegExp(filter), 'i');
            const isMatch = (result) => re.test(result.name);
            this.setState({results: _.filter(this.props.templates, isMatch)});
            this.setState({isLoading: false});
        }, 150);
    }
    onFocusSearch = () => {
        this.filterResults(this.state.searchValue);
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
                        loading={this.state.isLoading}
                        onSearchChange={this.onChangeSearch}
                        results={this.state.results}
                        value={this.state.searchValue}
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
    toggleWelcome: PropTypes.func,
    addToContract: PropTypes.func,
    fetchAPTemplates: PropTypes.func,
    templates: PropTypes.array,
};

const mapStateToProps = state => ({
    templates: state.templatesState.templatesAP,
});

const mapDispatchToProps = dispatch => ({
    toggleWelcome: toggle => dispatch(toggleWelcome(toggle)),
    addToContract: value => dispatch(addToContractAction(value)),
    fetchAPTemplates: () => dispatch(getTemplatesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

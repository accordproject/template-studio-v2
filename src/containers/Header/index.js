import React from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuidv4';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import image from '../../../public/img/logo.png';

import { testerSaga } from '../../sagas/modelSaga';
import { updateModelManagerAction } from '../../actions/modelActions';

import { AP_THEME } from '../App/themeConstants';

const modelError = {
  component: 'composer-concerto',
  name: 'ParseException',
  fileLocation: {
    start: {
      offset: 559,
      line: 15,
      column: 1
    },
    end: {
      offset: 559,
      line: 15,
      column: 1
    },
    fileName: './examples/volumediscount/model.cto'
  },
  shortMessage: 'Expected "namespace", comment, end of line, or whitespace but "n" found.',
  fileName: './examples/volumediscount/model.cto',
  message: 'This is one big long message with lots of information and maybe more information and then even more you better believe it oh boy so much information'
};

const parseError = {
  component: 'ergo-compiler',
  name: 'TypeException',
  fileLocation: {
    start: {
      line: 21,
      column: 54
    },
    end: {
      line: 21,
      column: 76
    }
  },
  shortMessage: "This operator received unexpected arguments of type `Double'  and `Integer'.",
  fileName: './examples/volumediscount/logic.ergo',
  message: 'This is one big long message with lots of information and maybe more information and then even more you better believe it oh boy so much information'
};

const ergoError = {
  component: 'ergo-compiler',
  name: 'ParseException',
  fileLocation: {
    start: {
      line: 17,
      column: 0
    },
    end: {
      line: 17,
      column: 7
    }
  },
  shortMessage: 'Parse error',
  fileName: './examples/volumediscount/logic.ergo',
  message: 'This is one big long message with lots of information and maybe more information and then even more you better believe it oh boy so much information'
};

const errrorExample = [modelError, parseError, ergoError];

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

const superDuper = (inputFun, err) => {
  err.uid = uuidv4();
  inputFun(err);
};

const Header = props => (
    <HeaderWrapper>
            <a href="https://www.accordproject.org">
                <HeaderImage src={image} alt="Accord Project" />
            </a>
        <HeaderTitle onMouseDown={() => superDuper(props.incrementButton, errrorExample)} >Template Studio</HeaderTitle>
    </HeaderWrapper>
);

Header.propTypes = {
  incrementButton: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  incrementButton: value => dispatch(updateModelManagerAction(value)),
});

export default connect(null, mapDispatchToProps)(Header);

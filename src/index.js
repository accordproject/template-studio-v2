import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MainApp from './containers/App';
import store from './store';

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<Provider store={store}><MainApp /></Provider>, wrapper) : false;

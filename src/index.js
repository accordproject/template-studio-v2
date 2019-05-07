import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MainApp from './containers/App';
import store from './store';

render(<Provider store={store}><MainApp /></Provider>, document.querySelector('#root'));

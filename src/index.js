import React from 'react';
import ReactDOM from 'react-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';

import TemplateStudio from './TemplateStudio';
// import reducer from './store/reducer';

// const store = createStore(reducer);
// const action = type => store.dispatch({type})

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<TemplateStudio />, wrapper) : false;

{/* <Provider store={store}><TemplateStudio /></Provider> */}
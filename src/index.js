import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import TemplateStudio from './TemplateStudio';
import reducer from './store/reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<Provider store={store}><TemplateStudio /></Provider>, wrapper) : false;

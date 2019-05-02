import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import App from './TemplateStudio';
import reducer from './store/reducer';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares),
);
sagaMiddleware.run(rootSaga);

const wrapper = document.getElementById('root');
wrapper ? ReactDOM.render(<Provider store={store}><App /></Provider>, wrapper) : false;

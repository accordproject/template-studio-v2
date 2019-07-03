import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import appReducer from './reducers/appReducer';
import templatesReducer from './reducers/templatesReducer';
import modelReducer from './reducers/modelReducer';
import contractReducer from './reducers/contractReducer';
import clauseTemplatesReducer from './reducers/clauseTemplatesReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  appState: appReducer,
  templatesState: templatesReducer,
  modelState: modelReducer,
  contractState: contractReducer,
  clauseTemplatesState: clauseTemplatesReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);
sagaMiddleware.run(rootSaga);

export default store;

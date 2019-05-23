import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import templatesReducer from './reducers/templatesReducer';
import modelReducer from './reducers/modelReducer';
import logicReducer from './reducers/logicReducer';
import sampleReducer from './reducers/sampleReducer';
import clauseReducer from './reducers/clauseReducer';
import contractReducer from './reducers/contractReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  templatesState: templatesReducer,
  modelState: modelReducer,
  logicState: logicReducer,
  sampleState: sampleReducer,
  clauseState: clauseReducer,
  contractState: contractReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);
sagaMiddleware.run(rootSaga);

export default store;

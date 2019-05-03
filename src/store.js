import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import templatesReducer from './reducers/templatesReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  templatesState: templatesReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);
sagaMiddleware.run(rootSaga);

export default store;

import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import TemplateStudio from './index';
import reducer from '../store/reducer';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

describe('<TemplateStudio />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<Provider store={store}><TemplateStudio /></Provider>);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});

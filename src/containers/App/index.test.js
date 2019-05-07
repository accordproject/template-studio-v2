import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { App } from './index';

const templates = [];
const fetchAPTemplates = () => null;
const addNewTemplate = () => null;
const updateLogicMock = () => null;
const updateModelMock = () => null;
const updateSampleMock = () => null;

const props = {
  templates,
  fetchAPTemplates,
  addNewTemplate,
  updateLogicMock,
  updateModelMock,
  updateSampleMock,
};

describe('<App />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<App {...props} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});

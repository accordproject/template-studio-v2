import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { App } from './index';

const templates = [];
const fetchAPTemplates = () => null;
const addNewTemplate = () => null;

const props = {
  templates,
  fetchAPTemplates,
  addNewTemplate,
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

import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { TemplateStudio } from './index';

const templates = [];
const fetchAPTemplates = () => null;
const addNewTemplate = () => null;

const props = {
  templates,
  fetchAPTemplates,
  addNewTemplate,
};

describe('<TemplateStudio />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<TemplateStudio {...props} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});

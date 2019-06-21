import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ErrorModal } from './index';


const props = {
  errorName: 'Error',
  errorMessage: 'Error message',
  errorDescription: 'Unexpected error',
  closeErrorModal: () => null,
};

describe('<ErrorModal />', () => {
  describe('on initialization', () => {
    it('renders page correctly', () => {
      const component = shallow(<ErrorModal {...props} />);
      const tree = toJson(component);
      expect(tree).toMatchSnapshot();
    });
  });
});

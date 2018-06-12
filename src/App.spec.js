// @flow

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('should match snapshot', () => {
  const wrapper: App = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

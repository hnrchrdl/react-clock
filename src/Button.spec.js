// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('should match snapshot', () => {
  const wrapper: Button = shallow(<Button onClick={() => {}} text="text" />);
  expect(wrapper).toMatchSnapshot();
});

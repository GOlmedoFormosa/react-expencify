import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/Header';

test( 'should render Header correctly', () => {

  const wrapper = shallow(<Header />);
  // Create a snapshot
  expect( wrapper ).toMatchSnapshot();

} );

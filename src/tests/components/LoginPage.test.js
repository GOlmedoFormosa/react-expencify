import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from '../../components/LoginPage';

test( 'should correctly render LoginPage.', () => {

  const wrapper = shallow( <LoginPage /> );
  expect( wrapper ).toMatchSnapshot();

} );

// Spy button
test( 'should call startLogin on button click.', () => {

  const startLogin = jest.fn();
  const wrapper = shallow( <Header startLogin={ startLogin } /> );
  wrapper.find( 'button' ).simulate( 'click' );
  expect( startLogin ).toHaveBeenCalled();

} );
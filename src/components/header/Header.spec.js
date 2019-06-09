import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

const setup = () => shallow(<Header />);

let component;
describe('Header Suite', () => {
  beforeEach(() => {
    component = setup();
  });
  it('Header should be rendered', () => {
    const header = component.find('header');
    expect(header.length).toBe(1);
  });
  it('Title should be << Football Player Finder >>', () => {
    const header = component.find('h1');
    expect(header.contains('Football Player Finder')).toBe(true);
  })
});
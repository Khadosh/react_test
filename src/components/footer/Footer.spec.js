import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

const setup = () => shallow(<Footer />);

let component;
describe('Footer Suite', () => {
  beforeEach(() => {
    component = setup();
  });
  it('Footer should be rendered', () => {
    const footer = component.find('footer');
    expect(footer.length).toBe(1);
  });
  it('Footer text should match', () => {
    const footer = component.find('footer');
    expect(footer.contains('Intive-FDV | React Test by Joaquín Nader.')).toBe(true);
  })
});
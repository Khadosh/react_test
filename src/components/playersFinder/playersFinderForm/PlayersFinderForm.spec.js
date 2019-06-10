import React from 'react';
import { shallow } from 'enzyme';
import PlayersFinderForm from './PlayersFinderForm';
import TextField from '@material-ui/core/TextField';

const initialProps = {
  setName: () => {},
  setPosition: () => {},
  setAge: () => {}
}

const setup = ( props = initialProps ) => {
  const mergedProps = { ...props, ...initialProps };
  return shallow(<PlayersFinderForm { ...mergedProps } />);
}

let component;
describe('PlayersFinderForm Suite', () => {
  beforeEach(() => {
    component = setup();
  });

  describe('Should Render', () => {
    it('PlayersFinderForm should be rendered', () => {
      const playersFinderForm = component.find('form');
      expect(playersFinderForm.length).toBe(1);
    });

    it('PlayersFinderForm should render 3 TextFields', () => {
      const playersFinderTextFields = component.find(TextField);
      expect(playersFinderTextFields.length).toBe(3);
    });

    it('PlayersFinderForm should render 3 TextFields', () => {
      const playersFinderTextFields = component.find(TextField);
      playersFinderTextFields.find('#input-name').simulate('change', { target: { value: 'Hola'} });

    });
  });
});
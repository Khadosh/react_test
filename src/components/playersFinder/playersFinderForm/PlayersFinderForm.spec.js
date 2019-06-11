import React from 'react';
import { shallow } from 'enzyme';
import PlayersFinderForm from './PlayersFinderForm';
import TextField from '@material-ui/core/TextField';

const initialProps = {
  setName: jest.fn(),
  setPosition: jest.fn(),
  setAge: jest.fn()
}

const setup = ( props = initialProps ) => {
  const mergedProps = { ...props, ...initialProps };
  return shallow(<PlayersFinderForm { ...mergedProps } />).dive();
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


  });

  describe('internalMethods', ()=>{
    it('setValue should update component state', () => {
      const PlayersFinderInstance = component.instance();
      PlayersFinderInstance.setValue('formName', 'test');
      expect(component.state().formName).toBe('test');
    });
    it('handleSetName should update formName state if its value is only letters', () => {
      const PlayersFinderInstance = component.instance();
      PlayersFinderInstance.handleSetName({ target: { value: 'test'} });
      expect(component.state().formName).toBe('test');
    });
    it('handleSetName should not update formName state if its value is only letters', () => {
      const PlayersFinderInstance = component.instance();
      PlayersFinderInstance.handleSetName({ target: { value: 'test'} });
      PlayersFinderInstance.handleSetName({ target: { value: 'test2'} });
      expect(component.state().formName).toBe('test');
    });
  });

  describe('simulateEvents', ()=>{
    it('input-name should should update formName state on change', () => {
      const inputName = component.find(TextField).find('#input-name');
      inputName.simulate('change', { target: { value: 'test'} });
      expect(component.state().formName).toBe('test');
    });

    it('select-position should should update formName state on change', () => {
      const selectName = component.find(TextField).find('#select-position');
      selectName.simulate('change', { target: { value: 'Keeper'} });
      expect(component.state().formPosition).toBe('Keeper');
    });

    it('input-age should should update formName state on change', () => {
      const inputAge = component.find(TextField).find('#input-age');
      inputAge.simulate('change', { target: { value: 20} });
      expect(component.state().formAge).toBe(20);
    });
  });
});
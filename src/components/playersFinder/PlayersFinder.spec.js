import React from 'react';
import { shallow } from 'enzyme';
import PlayersFinder from './PlayersFinder';
import PlayersFinderForm from './playersFinderForm/PlayersFinderForm';
import PlayersTable from './playersTable/PlayersTableReduxConnector';

const setup = () => shallow(<PlayersFinder />);

let component;
describe('PlayersFinder Suite', () => {
  beforeEach(() => {
    component = setup();
  });

  describe('Should Render', () => {
    it('PlayersFinder should be rendered', () => {
      const playersFinder = component.find('.players-finders__table');
      expect(playersFinder.length).toBe(1);
    });
    it('PlayersFinder should render PlayersFinderForm', () => {
      const playersFinderForm = component.find(PlayersFinderForm);
      expect(playersFinderForm.length).toBe(1);
    });
    it('PlayersFinder should render PlayersTable', () => {
      const playersTable = component.find(PlayersTable);
      expect(playersTable.length).toBe(1);
    });
  });

  describe('Internal Methods', () => {
    it('setValue should update component state', () => {
      const PlayersFinderInstance = component.instance();
      PlayersFinderInstance.setValue('name', 'test');
      expect(component.state().name).toBe('test');
    });
    it('handleSorting should update coponent state for sortBy and sortOrder', () => {
      const PlayersFinderInstance = component.instance();
      PlayersFinderInstance.handleSorting('position');
      expect(component.state().sortBy).toBe('position');
      expect(component.state().sortOrder).toBe('desc');
    });
    it('handleSorting should update coponent state for sortOrder if same param is received for sortBy', () => {
      const PlayersFinderInstance = component.instance();
      PlayersFinderInstance.handleSorting('name');
      expect(component.state().sortBy).toBe('name');
      expect(component.state().sortOrder).toBe('asc');
    });
  });
});
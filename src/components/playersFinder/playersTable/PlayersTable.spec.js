import React from 'react';
import PlayersTable from './PlayersTable';
import { shallow } from 'enzyme';
import Table from '@material-ui/core/Table';

const initialProps = {
  players: [],
  handleSorting: jest.fn(),
  sortBy: 'test',
  sortOrder: 'desc',
  classes: {},
  fetchData: jest.fn()
};

const setup = conf => {
  const props = { ...initialProps, ...conf };
  return shallow(<PlayersTable { ...props } />).dive();
};

let component;

describe('PlayersTable Suite', () => {
  beforeEach(() => {
    component = setup();
  });

  describe('Should Render', () => {
    it('PlayersTable should be rendered', () => {
      const playersTable = component.find('.players-table');
      expect(playersTable.length).toBe(1);
    });

    it('PlayersTable should render a table if fetchingData is false', () => {
      component.setState({ fetchingData: false });
      const playersTable = component.find(Table);
      expect(playersTable.length).toBe(1);
    });

    it('PlayersTable should NOT render a table if fetchingData is false', () => {
      component.setState({ fetchingData: true });
      const playersTable = component.find(Table);
      expect(playersTable.length).toBe(0);
    });
  });

  describe('internalMethods', ()=> {
    it('closeSnackbar should set errorMessage to empty', () => {
      const PlayersTableInstance = component.instance();
      component.setState({ errorMessage: 'asdf'});
      expect(component.state().errorMessage).toBe('asdf');
      PlayersTableInstance.closeSnackbar();
      expect(component.state().errorMessage).toBe('');
    });
  });

  describe('LyfeCycleMethods', () => {
    it('fetchData should be called on mount', () => {
      component.instance();
      expect(initialProps.fetchData).toHaveBeenCalled();
    });
    it('abortController should be called on unMount', () => {
      const abortSpy = jest.fn();
      const instance = component.instance();
      instance.abortController = {
        abort: abortSpy
      };
      component.unmount();
      expect(abortSpy).toHaveBeenCalled();
    });
  });

  describe('simulateEvents', () => {
    it('clicking on StyledTableCell should call handleSorting', () => {
      component.setState({ fetchingData: false });
      const tableCell = component.find('WithStyles(WithStyles(ForwardRef(TableCell)))');
      tableCell.first().simulate('click');
      expect(initialProps.handleSorting).toHaveBeenCalled();
    });
  });
});
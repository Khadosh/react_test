import React, { PureComponent } from 'react';
import PlayersFinderForm from './playersFinderForm/PlayersFinderForm';
import PlayersTable from './playersTable/PlayersTableReduxConnector';

class PlayersFinder extends PureComponent {
  state = {
    name: '',
    position: '',
    age: 0,
    sortBy: 'name',
    sortOrder: 'desc'
  }

  setValue = (target, value) => this.setState({ [target]: value });

  handleSorting = sortType => {
    const order = (sortType === this.state.sortBy && this.state.sortOrder === 'desc')
      ? 'asc'
      : 'desc';
    this.setValue('sortOrder', order);
    this.setValue('sortBy', sortType);
  }

  render() {
    const { setValue } = this;

    return (
      <div className="players-finders__table">
        <PlayersFinderForm
          setName={ value => setValue('name', value) }
          setPosition={ value => setValue('position', value) }
          setAge={ value => setValue('age', value) }
        />
        <PlayersTable { ...{ ...this.state, handleSorting: this.handleSorting } } />
      </div>
    );
  }
}

export default PlayersFinder;
import React, { useState } from 'react';
import PlayersFinderForm from './PlayersFindersForm';
import PlayersTable from './playersTable/PlayersTableReduxConnector';

const PlayersFinders = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [age, setAge] = useState(0);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('desc');

    const handleSorting = sortType => {
    const order = (sortType === sortBy && sortOrder === 'desc')
      ? 'asc'
      : 'desc';
    setSortOrder(order);
    setSortBy(sortType);
  }

  return (
    <div className="players-finders__table">
      <PlayersFinderForm { ...{setName, setPosition, setAge} } />
      <PlayersTable {
        ...{
          name,
          position,
          age,
          sortBy,
          handleSorting,
          sortOrder
        }
      }
      />
    </div>
  );
}

export default PlayersFinders;
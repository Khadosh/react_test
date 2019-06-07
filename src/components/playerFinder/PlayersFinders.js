import React, { useState } from 'react';
import PlayersFinderForm from './PlayersFindersForm';
import PlayersTable from '../playersTable/PlayersTable';
import './playersFinder.scss';

const PlayersFinders = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [age, setAge] = useState(0);
  const [sortBy, setSortBy] = useState('');

  return (
    <div className="players-finders">
      <h1>Football Player Finder</h1>
      <div className="players-finders__table">
        <PlayersFinderForm { ...{setName, setPosition, setAge} } />
        <PlayersTable { ...{ name, position, age, sortBy, setSortBy } }/>
      </div>
    </div>
  );
}

export default PlayersFinders;
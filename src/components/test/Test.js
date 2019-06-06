import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchData } from './redux/Test.actions';
import { getPlayers } from './redux/Test.selectors';

const mapStateToProps = (store) => ({
  players: getPlayers(store)
});

const mapDispatchToProps = {
  fetchData
};

const Test = ({ players, fetchData }) => {
  const [ fetchingData, setFetchingData ] = useState(false);

  const fetchPlayers = () => {
    setFetchingData(true);
    fetchData();
    setFetchingData(false);
  }

  useEffect(() => {
    fetchPlayers()
  }, []);

  return (
    <div>
     {
       fetchingData
        ? 'loading'
        : players.map(player => <p>{ JSON.stringify(player) }</p>)
     }
     </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
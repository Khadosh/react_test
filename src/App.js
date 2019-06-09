import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PlayersFinder from './components/playerFinder/PlayersFinder';
import './app.scss';

const App = () => (
  <div className="app">
    <Header />
    <main>
      <PlayersFinder />
    </main>
    <Footer />
  </div>
);

export default App;

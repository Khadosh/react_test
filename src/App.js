import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PlayersFinder from './components/playersFinder/PlayersFinder';
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

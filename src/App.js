import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PlayersFinders from './components/playerFinder/PlayersFinders';
import './app.scss';

const App = () => (
  <div className="app">
    <Header />
    <main>
      <PlayersFinders />
    </main>
    <Footer />
  </div>
);

export default App;

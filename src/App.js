import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import List from './components/List';
import User from './components/User';

function App() {
  const [team, setTeam] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/assets/logo-zombie.png'} className="logo" alt="logo" />
        <h2 className="teammates-counter">
          <img src={'/assets/teammates.png'} alt="teammates-counter-img" />
          <div>My Teammates :<div className="teammates-count">{team.length}</div></div>
        </h2>
      </header>
      <Routes>
        <Route exact path='/' element={<List team={team} setTeam={setTeam} />}/>
        <Route exact path='/:id' element={<User team={team} setTeam={setTeam}/>}/>
      </Routes>
    </div>
  );
}

export default App;
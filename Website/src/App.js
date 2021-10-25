import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Team from './pages/Team/Team';
import Contact from './pages/Contact/Contact';
import Project from './pages/Project/Project';
import Fonctionnement from './pages/Fonctionnement/Fonctionnement';
import Dashboard from './pages/Dashboard/Dashboard';
import LockDoor from './pages/LockDoor/LockDoor';
import Navbar from './components/Navbar/Navbar';

import "./App.css"

const App = () => {
  return (
   <Router>
    <Navbar/>
    <main>
      <Switch>
        <Route path="/" exact>
          <Project/>
        </Route>
        <Route path="/team" exact>
          <Team/>
        </Route>
        <Route path="/functioning" exact>
          <Fonctionnement/>
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard/>
        </Route>
        <Route path="/contact" exact>
          <Contact/>
        </Route>
        <Route path="/lockdoor" exact>
          <LockDoor/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
   </Router>
  );
}

export default App;

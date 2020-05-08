import React from 'react';
import './App.scss';
import Nav from './components/nav';
import Shell from './components/shell';
import Headline from './pages/headline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Resume from './pages/resume';

function App() {
  return (
    <Router>
      <Shell>
          <Nav/>
          <div className="content">
            <Switch>
              <Route path="/resume">
                <Resume />
              </Route>
              <Route path="/">
                <Headline />
              </Route>
            </Switch>
          </div>
      </Shell>
    </Router>
  );
}

export default App;

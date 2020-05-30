import React from 'react';
import './App.scss';
import Nav from './components/nav';
import Shell from './components/shell';
import Headline from './pages/headline';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Resume from './pages/resume';
import Contact from './pages/contact';
import Projects from './pages/projects';
import ComingSoon from './pages/coming';

/*


                <Route path="/blog">
                  <ComingSoon />
                </Route>
                <Route path="/">
                  <Headline />
                </Route>
*/

const App = () => (
  <Router>
    <Nav/>
        <Shell>
            <div className="content">
              <Switch>
                <Route path="/resume">
                  <Resume />
                </Route>
                <Route path="/projects">
                  <Projects />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
              </Switch>
            </div>
        </Shell>
      </Router>
)

export default App;


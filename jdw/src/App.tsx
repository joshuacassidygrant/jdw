import React from 'react';
import './App.scss';
import Nav from './components/nav';
import Shell from './components/shell';
import Headline from './components/headline';

function App() {
  return (
    <Shell>
        <Nav/>
        <div className="content">
          <Headline />
        </div>
    </Shell>
  );
}

export default App;

import React, { Component } from 'react';
import PersistanceDrawer from './component/toolbar/PersistentDrawerLeft';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersistanceDrawer/>
      </div>
    );
  }
}

export default App;

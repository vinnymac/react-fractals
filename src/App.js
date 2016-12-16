import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dancer from './Dancer';

class App extends Component {

    render() {
        return (
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>This is a dancing Pythagoras tree</h2>
              </div>
              <p className="App-intro">
                <Dancer />
              </p>
            </div>
        );
    }
}

export default App;

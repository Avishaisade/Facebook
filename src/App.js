import React, { Component } from 'react';
import User from './users/users';
import './scss/styles.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <User id="XXX" />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import UserHeader from './users/userHeader';
import './scss/styles.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserHeader id="XXX" />
      </div>
    );
  }
}

export default App;

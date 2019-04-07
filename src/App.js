import React, { Component } from 'react';
import UserHeader from './users/userHeader';
import Cover from './users/cover';
import './scss/styles.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserHeader id="XXX" />
        {/* <Cover url="https://scontent.fsdv1-2.fna.fbcdn.net/v/t1.0-9/c0.242.960.355a/46446863_10156847086899031_7210719975055556608_n.jpg?_nc_cat=105&_nc_ht=scontent.fsdv1-2.fna&oh=404470e8c40099deaf0bbbccbe95525f&oe=5D3F0FA3"></Cover> */}
      </div>
    );
  }
}

export default App;

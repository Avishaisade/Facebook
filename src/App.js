import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './scss/styles.scss';

import Home from './Home';
import User from './users/User';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link className="App-link" to='/'>Home</Link> |
          <Link className="App-link" to='/user'>User</Link> |
          <div className="globalContainer">
            <div className="fb_content">
              <Route path='/' exact component={Home} />
              <Route path='/user' render={() => <User {...this.props} />} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

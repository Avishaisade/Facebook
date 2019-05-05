import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './scss/styles.scss';

import Home from './Home';
import Header from './Header';
import User from './users/User';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          {/* Navigation */}
          <Link className="App-link" to='/'>Home</Link> |
          <Link className="App-link" to='/User'>User</Link> |
          <Link className="App-link" to='/Login'>Login</Link>

          <div className="globalContainer">
            <div className="fb_content">
              {/* Routers */}
              <Route path='/' exact component={Home} />
              <Route path='/User' render={() => <User {...this.props} />} />
              <Route path='/Login' exact component={Login} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

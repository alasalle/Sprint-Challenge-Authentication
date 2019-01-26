import React, { Component } from 'react';
import {NavLink, Route } from "react-router-dom";
import './App.css';

import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Jokes from "./components/Jokes";

const Home = props => {
return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

class App extends Component {

  signout = e => {
  localStorage.removeItem('jwt')
} 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/register">Register</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/jokes">Users</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/" onClick={() => this.signout()} exact>Sign Out</NavLink>
          </nav>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/signin" component={SignIn} exact />
            <Route path="/jokes" component={Jokes} exact />
          </main>
        </header>
      </div>
    );
  }
}

export default App;

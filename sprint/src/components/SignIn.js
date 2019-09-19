import React, { Component } from "react";
import axios from "axios";

class Signin extends Component {
  state = {
    username: "",
    password: ""
  }

  handleInputChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault();
    const creds = this.state;
    const endpoint = "http://localhost:3300/api/login";
    axios.post(endpoint, creds)
    .then(res => {
      console.log('response from login', res.data);
      localStorage.setItem('jwt', res.data.token);
      this.setState({username: "", password: ""})
    })
    .catch(err => {
      console.log('error from login', err)
      this.setState({username: "", password: ""})
    })
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label for="username">Username</label>
          <input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
        </div>
        <div>
          <label for="password">Password</label>
          <input name="password" type="text" value={this.state.password} onChange={this.handleInputChange} />
        </div>
        <button type="submit">Sign In</button>
        <div />
      </form>
    );
  }
}

export default Signin;
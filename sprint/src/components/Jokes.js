import React, { Component } from "react";
import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: [],
  }
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const endpoint = "http://localhost:3300/api/jokes";
    const options = {
      headers: {
        Authorization: token
      }
    }
    axios
      .get(endpoint, options)
      .then(res => {
        this.setState({jokes: res.data})
      })
      .catch(err => {
        console.log("error from /api/jokes", err);
      });
  }

  render() {
    return (
      <div>
        <h2>List of Dad Jokes</h2>
        <ul>
          {this.state.jokes.map(joke => <li key={joke.id}>{joke.joke}</li>)}
        </ul>
      </div>
    );
  }
}

export default Jokes;
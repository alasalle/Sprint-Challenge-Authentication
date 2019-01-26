const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const secret = process.env.JWT_SECRET || "add a .env file to root of project with the JWT_SECRET variable";

const generateToken = user => {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: "1d",
    jwtid: `${user.id}`
  };
  return jwt.sign(payload, secret, options);
  
};

function register(req, res) {
  const user = req.body;

  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else if (user.username.length > 255) {
    res.status(400).json({ error: "username must not exceed 255 characters" });
  } else if (user.password.length > 255) {
    res.status(400).json({ error: "password must not exceed 255 characters" });
  } else {
    user.password = bcrypt.hashSync(user.password, 14);
    return db("users")
      .insert(user)
      .then(ids => {
        const token = generateToken(user);
        res.status(200).json({ id: ids[0], token });
      })
      .catch(err =>
        res.status(500).json({ message: "trouble registering", error: err })
      );
  }
}

function login(req, res) {
  const user = req.body;

  if (
    !user.username ||
    typeof user.username !== "string" ||
    user.username === ""
  ) {
    res
      .status(400)
      .json({ error: "username must be included and must be a string" });
  } else if (
    !user.password ||
    typeof user.password !== "string" ||
    user.password === ""
  ) {
    res
      .status(400)
      .json({ error: "password must be included and must be a string" });
  } else {
    return db("users")
      .where("username", user.username)
      .then(users => {
        if (users[0] && bcrypt.compareSync(user.password, users[0].password)) {
          const token = generateToken(users[0]);
          res.status(200).json({ message: "Logged In", token });
        } else {
          res.status(404).json({ message: "Login Incorrect" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "trouble logging in", error: err });
      });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}

import { Router } from "express";
import axios from "axios";
import validate from "express-validation";

import token from "../../token-setup";

import validation from "./validation/index";
import userMapper from "../services/userService";

export default () => {
  let router = Router();

  const getUserAndRepos = (username) =>
    Promise.all([
      axios
        .get(`http://api.github.com/users/${username}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
      axios
        .get(`http://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => res.data),
    ]).then(([user, repos]) => userMapper(user, repos));

  /** GET /health-check - Check service health */
  router.get("/health-check", (_, res) => res.send("OK"));

  // The following is an example request.response using axios and the
  // express res.json() function
  /** GET /api/rate_limit - Get github rate limit for your token */
  router.get("/rate", (_, res) => {
    if (!token) {
      res.send(
        "Make sure to follow the directions to set up your GitHub token"
      );
      return;
    }
    axios
      .get(`http://api.github.com/rate_limit`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => res.json(data));
  });

  /** GET /api/user/:username - Get user */
  router.get("/user/:username", validate(validation.user), async (req, res) => {
    getUserAndRepos(req.params.username)
      .then((user) => res.json(user))
      .catch((error) => {
        res.status(error.response.status);
        res.json(error.response.data);
      });
  });
  /** GET /api/users? - Get users */
  router.get("/users/", validate(validation.users), async (req, res) => {
    if (req.query.username instanceof Array) {
      Promise.all(
        req.query.username.map((username) => getUserAndRepos(username))
      )
        .then((users) => {
          // 🔥 Determine the winner (example: highest total stars)
          const winner = users.reduce((prev, curr) => {
            return curr["total-stars"] > prev["total-stars"] ? curr : prev;
          });

          // 🔁 Filter out winner and reinsert at position 0
          const reorderedUsers = [winner, ...users.filter((u) => u !== winner)];

          res.json(reorderedUsers);
        })
        .catch((error) => {
          res
            .status(error.response?.status || 500)
            .json(error.response?.data || { error: "Internal server error" });
        });
    } else {
      getUserAndRepos(req.query.username)
        .then((user) => res.json(user))
        .catch((error) => {
          res
            .status(error.response?.status || 500)
            .json(error.response?.data || { error: "Internal server error" });
        });
    }
  });

  return router;
};

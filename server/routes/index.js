import { Router } from "express";
import axios from "axios";
import { userSchema, usersSchema } from "./validation/index.js"; // 👈 update schema import
import userMapper from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.GITHUB_TOKEN;

export default () => {
  const router = Router();

  const getUserAndRepos = (username) =>
    Promise.all([
      axios
        .get(`https://api.github.com/users/${username}`, {
          headers: { Authorization: token },
        })
        .then((res) => res.data),
      axios
        .get(`https://api.github.com/users/${username}/repos`, {
          headers: { Authorization: token },
        })
        .then((res) => res.data),
    ]).then(([user, repos]) => userMapper(user, repos));

  /** GET /health-check - Check service health */
  router.get("/health-check", (_, res) => res.send("OK"));

  /** GET /api/rate_limit - GitHub rate limit */
  router.get("/rate", (_, res) => {
    if (!token) {
      return res.send("Missing GitHub token.");
    }
    axios
      .get(`https://api.github.com/rate_limit`, {
        headers: { Authorization: token },
      })
      .then(({ data }) => res.json(data));
  });

  /** GET /api/user/:username */
  router.get("/user/:username", async (req, res) => {
    const { error } = userSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    getUserAndRepos(req.params.username)
      .then((user) => res.json(user))
      .catch((error) => {
        res
          .status(error.response?.status || 500)
          .json(error.response?.data || { error: "Internal server error" });
      });
  });

  /** GET /api/users?username=...&username=... */
  router.get("/users", async (req, res) => {
    const { error } = usersSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const usernames = Array.isArray(req.query.username)
      ? req.query.username
      : [req.query.username];

    Promise.all(usernames.map(getUserAndRepos))
      .then((users) => {
        const winner = users.reduce((prev, curr) =>
          curr["total-stars"] > prev["total-stars"] ? curr : prev
        );
        const reorderedUsers = [winner, ...users.filter((u) => u !== winner)];
        res.json(reorderedUsers);
      })
      .catch((error) => {
        res
          .status(error.response?.status || 500)
          .json(error.response?.data || { error: "Internal server error" });
      });
  });

  return router;
};

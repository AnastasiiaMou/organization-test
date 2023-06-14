const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const authentication = require("./../auth.token");

router.post("/register", UserController.registerUser);

router.post("/authenticate", UserController.authenticateUser);

router.get("/users", authentication, UserController.getUsers);

router.put(
  "/users/:userId/change-boss",
  authentication,
  UserController.changeUserBoss
);

module.exports = router;

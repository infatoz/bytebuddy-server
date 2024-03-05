const express = require("express");
const {
  userSignup,
  userLogin,
  getUsers,
  getUser,
} = require("../controllers/users");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;

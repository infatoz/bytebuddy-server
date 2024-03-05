// problems.js
const express = require("express");
const { verifyToken } = require("../middleware/verifytoken");

const {
  addProblem,
  getProblems,
  getProblem,
} = require("../controllers/problems");

const router = express.Router();

// Route to post a new problem
router.post("/", verifyToken, addProblem);

// get all problems
router.get("/", verifyToken, getProblems);

// single problem by its ID
router.get("/:id", verifyToken, getProblem);

module.exports = router;

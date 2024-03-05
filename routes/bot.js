// problems.js
const express = require("express");
const { verifyToken } = require("../middleware/verifytoken");
const { askBot, askSolution } = require("../controllers/bot");

const router = express.Router();

// Route to compile
router.post("/ask", verifyToken, askBot);
router.post("/ask/:problemId/:userId", verifyToken, askSolution);

module.exports = router;

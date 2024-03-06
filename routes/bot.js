// problems.js
const express = require("express");
// const { verifyToken } = require("../middleware/verifytoken");
const { askBot } = require("../controllers/bot");

const router = express.Router();

// Route to compile
router.post("/ask", askBot);
// router.post("/ask/:problemId/:userId", askSolution);

module.exports = router;

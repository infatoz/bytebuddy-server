// problems.js
const express = require("express");
const { verifyToken } = require("../middleware/verifytoken");
const { compileCode } = require("../controllers/compiler");

const router = express.Router();

// Route to compile
router.post("/compile", verifyToken, compileCode);

module.exports = router;

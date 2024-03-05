const Problems = require("../models/problems");

// Post new problem
const addProblem = async (req, res) => {
  // console.log("Add Problems API Calling");
  try {
    const data = new Problems(req.body);
    var resp = await data.save();

    res
      .status(201)
      .json({ documentId: resp._id, message: "Problem added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all problems
const getProblems = async (req, res) => {
  try {
    const problems = await Problems.find();
    res.status(200).json(problems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get single problem
const getProblem = async (req, res) => {
  try {
    const problemID = req.params.id;
    if (problemID === undefined || problemID === null) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    const problem = await Problems.findById(problemID);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addProblem, getProblems, getProblem };

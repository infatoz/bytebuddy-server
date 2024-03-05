const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Problems Schema
const ProblemsSchema = new Schema({
  question_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  topics: {
    type: [String],
    default: [],
  },
  categories: {
    type: [String],
    default: [],
  },
  example_case: [
    {
      sample_input: {
        type: String,
        // Add any specific validations if needed
      },
      sample_output: {
        type: String,
        // Add any specific validations if needed
      },
      explanation: {
        type: String,
        // Add any specific validations if needed
      },
    },
  ],
  sample_code: [
    {
      language: {
        type: String,
        // Add any specific validations if needed
      },
      code: {
        type: String,
        // Add any specific validations if needed
      },
    },
  ],
  test_case: [
    {
      input: {
        type: String,
        required: true,
        // Add any specific validations if needed
      },
      output: {
        type: String,
        required: true,
        // Add any specific validations if needed
      },
    },
  ],
});

// Define the Problems model
const Problems = mongoose.model("Problems", ProblemsSchema);

module.exports = Problems;

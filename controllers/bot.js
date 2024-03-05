const { geminiModel } = require("../config/gemini");
const Conversation = require("../models/conversation");

const askBot = async (req, res) => {
  const { msg, history } = req.body;
  try {
    const chat = geminiModel.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    // const msg = "How many paws are in my house?";

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(201).json({ response: text });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const askSolution = async (req, res) => {
  try {
    const problemID = req.params.problemId;
    const userID = req.params.userID;
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

module.exports = { askBot, askSolution };

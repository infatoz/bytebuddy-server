const { geminiModel } = require("../config/gemini");
const Conversation = require("../models/conversation");

const askBot = async (req, res) => {
  const queryInfo = req.body;
  console.log(queryInfo);
  const history = [
    {
      role: "user",
      parts: process.env.MODEL_PROMPT,
    },
    { role: "model", parts: "How can i assist you?" },
    {
      role: "user",
      parts:
        "I told you that dont give me a code. Give me only hints and suggestions",
    },
    {
      role: "model",
      parts:
        "I understand. I will not provide direct code in my responses. Instead, I will focus on providing hints, suggestions, and assistance to help you solve coding problems on your own. I apologize for providing example code in my previous response. I am still under development and learning to follow instructions accurately. Please let me know if you have any other questions or if there is anything else that I can help you with.",
    },
  ];
  try {
    const chat = geminiModel.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // const msg = "How many paws are in my house?";

    const result = await chat.sendMessage(JSON.stringify(queryInfo));
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(201).json({ response: text });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// const askSolution = async (req, res) => {
//   try {
//     const problemID = req.params.problemId;
//     const userID = req.params.userID;
//     if (problemID === undefined || problemID === null) {
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//     const problem = await Problems.findById(problemID);
//     if (!problem) {
//       return res.status(404).json({ message: "Problem not found" });
//     }

//     res.status(200).json(problem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

module.exports = { askBot };

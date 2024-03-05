const { python } = require("compile-run");

const lang = {
  PYTHON: "python",
  JAVA: "java",
  C: "c",
  CPP: "cpp",
  DART: "dart",
  NODEJS: "nodejs",
};

const compileCode = async (req, res) => {
  const { sourceCode, input, language = "python" } = req.body;

  if (!sourceCode) {
    return res.status(500).json({ message: "Please type something to start" });
  }

  if (language == lang.PYTHON) {
    const resultPromise = python.runSource(sourceCode, { stdin: input });
    resultPromise
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } else if (language == lang.JAVA) {
    const resultPromise = python.runSource(sourceCode, { stdin: input });
    resultPromise
      .then((result) => {
        console.log(result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  // res.status(500).json({ message: "Internal Server Error" });
};

module.exports = { compileCode };

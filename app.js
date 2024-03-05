const express = require("express");
const cors = require("cors");

const user_route = require("./routes/users");
const problem_route = require("./routes/problems");
const compile_route = require("./routes/compiler");
const bot_route = require("./routes/bot");

// const mongoose = require("mongoose");
const connectDB = require("./config/mongodb");

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/user/", user_route);
app.use("/problem/", problem_route);
app.use("/compiler/", compile_route);
app.use("/bot/", bot_route);

app.listen(port, () => {
  console.log(`ByteBuddy Server is running on http://localhost:${port}`);
});

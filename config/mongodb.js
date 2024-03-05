const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("ByteBuddy connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error while connecting ByteBuddy", error);
    });

module.exports = connectDB;

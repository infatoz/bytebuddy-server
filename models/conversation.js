const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  parts: {
    type: String,
    required: true,
  },
});

const ConversationSchema = new Schema({
  created_on: {
    type: Date,
    required: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  history: [HistorySchema],
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;

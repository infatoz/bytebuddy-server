const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Users Schema
const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  userRole: {
    type: String,
  },
  rank: {
    type: Number,
  },
  profile_url: {
    type: String,
  },
  solved_problems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Problems",
    },
  ],
  attempted_problems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Problems",
    },
  ],
  preferences:{  
    practice_time: {
      type: Number
    },
    proficiency_level: {
      type:Number
    },
    
}
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/user");

// user signup
const userSignup = async (req, res) => {
  console.log("User Signup API calling...");
  try {
    const { fullname, username, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new Users({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRETE_KEY, {
      expiresIn: "48h",
    });

    res.status(200).json({ token, message: "Successfully logged in", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get one user
const getUser = async (req, res) => {
  try {
    const userID = req.params.id;
    if (userID === undefined || userID === null) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    const user = await Users.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { userSignup, userLogin, getUsers, getUser };

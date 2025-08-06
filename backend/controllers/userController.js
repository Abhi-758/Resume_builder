const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async function (req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "You are already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign({ username, email }, process.env.JWT_KEY);
    res.cookie("token", token);

    return res.status(201).json({ message: "Registration Successfull" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error registering user",
    });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields are required" });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "You are not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign(
        { email, username: user.username },
        process.env.JWT_KEY
      );
      res.cookie("token", token);
      return res.status(200).json({ message: "Login Success" });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error logging in tbe user",
    });
  }
};

module.exports.logoutUser = function (req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfull" });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error logging out tbe user",
    });
  }
};

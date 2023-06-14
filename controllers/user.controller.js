const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authentication = require("./../auth.token");

exports.registerUser = async function (req, res) {
  try {
    const { name, email, password, bossId } = req.body;

    // Check if the boss exists
    const boss = await User.findById(bossId);
    if (!boss) {
      return res.status(404).json({ message: "Boss not found" });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      boss: bossId,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.authenticateUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check the password
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, "12345");

    res.json({ token });
  } catch (error) {
    console.error("Error authenticating user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsers = async function (req, res) {
  try {
    const { userId, role } = req.user;

    let users = [];

    if (role === "admin") {
      // Administrator can see everyone
      users = await User.find();
    } else if (role === "boss") {
      // Boss can see herself and all subordinates (recursively)
      users = await User.find({ boss: userId }).populate("subordinates");
    } else {
      // Regular user can only see herself
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      users = [user];
    }

    res.json({ users });
  } catch (error) {
    console.error("Error getting users", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.changeUserBoss = async function (req, res) {
  try {
    const { userId } = req.params;
    const { bossId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const boss = await User.findById(bossId);
    if (!boss) {
      return res.status(404).json({ message: "Boss not found" });
    }

    // Only boss can change the user's boss
    if (user.boss.toString() !== req.user.userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.boss = bossId;
    await user.save();

    res.json({ message: "User's boss changed successfully" });
  } catch (error) {
    console.error("Error changing user's boss", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

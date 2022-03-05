const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const { generateToken } = require("../middlewares/auth.middleware");

const registerUser = asyncHandler(async (req, resp) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    resp.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    resp.status(400);
    throw new Error("That user already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    resp.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    resp.status(400);
    throw new Error("Invalid User data");
  }
});

const loginUser = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    resp.status(400);
    throw new Error("All fields are required");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    resp.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    resp.status(400);
    throw new Error("Invalid credentials");
  }
});

const getUser = asyncHandler(async (req, resp) => {
  resp.status(200).json(req.user);
});

module.exports = { registerUser, loginUser, getUser };

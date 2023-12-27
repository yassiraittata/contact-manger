const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

/**
 * @desc Regiseter a new user
 * @route /api/users/register
 * @access public
 */
const userRegister = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const errors = validationResult(req);

  // check if the array is not empty
  // the validationResult returns an array of all the errors
  if (!errors.isEmpty()) {
    res.status(400);
    console.log(errors.array()[0].msg);
    throw new Error(errors.array()[0].msg);
  }

  const userAvailable = await userModel.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email already exists!");
  }

  // hash tha password
  const hash = await bcrypt.hash(password.toString(), 12);

  const user = await userModel.create({
    email,
    username,
    password: hash,
  });

  res.json(user);
});

/**
 * @desc login user
 * @route /api/users/login
 * @access public
 */
const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const user = await userModel.findOne({ username });

  if (!user) {
    res.status(401);
    throw new Error("username not exist!");
  }

  const isPwMatch = bcrypt.compare(password, user.password);

  // signature the token
  const ac_token = jwt.sign(
    {
      user: {
        username: user.username,
        id: user.id,
      },
    },
    "secret",
    {
      expiresIn: "10m",
    }
  );

  res.json({ token: ac_token });
});

/**
 * @desc current user info
 * @route /api/users/current
 * @access private
 */
const currentUser = asyncHandler(async (req, res) => {
  const user = re.user;
  res.json({ message: user });
});

module.exports = { userLogin, userRegister, currentUser };

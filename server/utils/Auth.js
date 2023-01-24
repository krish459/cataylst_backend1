const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

// Desc to register the user (customer,admin,broker,owner)

const userRegister = async (userDets, role, res) => {
  try {
    // validate the user
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false,
      });
    }
    let emailRegistered = await validateEmail(userDets.email);
    if (!emailRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false,
      });
    }

    // get the hashed password
    const hashedPassword = await bcrypt.hash(userDets.password, 12);

    const newUser = new User({
      ...userDets,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();
    return res.status(201).json({
      message: `User is successfully registered`,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unable to create your account`,
      success: false,
    });
  }
};

const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // first check if username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: `Username is not found. Invalid login credentials`,
      success: false,
    });
  }
  if (user.role != role) {
    return res.status(403).json({
      message: `Please make sure you are loggging in from right portal`,
      success: false,
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // issue the token
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email,
      },
      SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168,
    };
    return res.status(200).json({
      ...result,
      message: `User is successfully Logged in`,
      success: true,
    });
  } else {
    return res.status(403).json({
      message: `Incorrect Password`,
      success: false,
    });
  }
};

const validateUsername = async (username) => {
  let user = await User.findOne({ username });
  return user ? false : true;
};
const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

module.exports = {
  userRegister,
  userLogin,
};

const User = require("../models/userModel");
const bcrypt = require("bcrypt");

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
};

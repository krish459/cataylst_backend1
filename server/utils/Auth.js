const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const passport = require("passport");
const { z, ZodError } = require("zod");
const { ROLES } = require("../utils/Enum");
const { saveData } = require("./Zodcheck");

// Desc to register the user (customer,admin,broker,owner)

const userRegister = async (userDets,role, res) => {
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

    const result1 = await saveData(checkDataUser, userDets);
    if (result1.success) {
      await newUser.save();
      return res.status(201).json({
        message: `User is successfully registered`,
        success: true,
      });
    } else {
      return res.status(400).json({ message: "Invalid Input" ,
      success: false,});
    }
  } catch (error) {
    return res.status(500).json({
      message: `Unable to create your account`,
      success: false,
    });
  }
};
const checkDataUser = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  // role: z.enum([ROLES.CUSTOMER, ROLES.ADMIN, ROLES.BROKER, ROLES.CUSTOMER]),
});

const userLogin = async (userCreds, roles, res) => {
  let { username, password } = userCreds;
  // first check if username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: `Username is not found. Invalid login credentials`,
      success: false,
    });
  }
  // console.log(user.role);
  // console.log(role);
  if (!roles.includes(user.role)) {
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

// passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

// role middleware
const checkRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
    success: false,
  });
};

const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = (user) => {
  return {
    username: user.username,
    email: user.email,
    _id: user._id,
    name: user.name,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

// const authByRole = (allowedRole) => {
//   return function (req, res, next) {
//     if (allowedRole == req.body.role) {
//       next();
//     } else {
//       return res.status(400).json({
//         message: `Access Denied`,
//         success: false,
//       });
//     }
//   };
// };

module.exports = {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
  //   authByRole,
};

const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
  //   authByRole,
} = require("../utils/Auth");
const { ROLES } = require("../utils/Enum");

const router = require("express").Router();

//  Registration route
router.post("/register", async (req, res) => {
  await userRegister(req.body, res);
});

// Owner Login route
router.post("/login", async (req, res) => {
  await userLogin(req.body, ROLES.ADMIN, res);
});

// // customer Resgitration route
// router.post("/register-customer", async (req, res) => {
//   await userRegister(req.body, "customer", res);
// });

// // admin Registration route
// router.post("/register-admin", async (req, res) => {
//   await userRegister(req.body, "admin", res);
// });

// // Owner Registration route
// router.post("/register-owner", async (req, res) => {
//   await userRegister(req.body, "owner", res);
// });

// // broker Registration route
// router.post("/register-broker", async (req, res) => {
//   await userRegister(req.body, "broker", res);
// });

// // customer Login route
// router.post("/login-customer", async (req, res) => {
//   await userLogin(req.body, "customer", res);
// });

// // admin Login route
// router.post("/login-admin", async (req, res) => {
//   await userLogin(req.body, "admin", res);
// });

// // Owner Login route
// router.post("/login-owner", async (req, res) => {
//   await userLogin(req.body, "owner", res);
// });

// // broker Login route
// router.post("/login-broker", async (req, res) => {
//   await userLogin(req.body, "broker", res);
// });

module.exports = router;

const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  checkRole,
} = require("../utils/Auth");

const router = require("express").Router();

// customer Resgitration route
router.post("/register-customer", async (req, res) => {
  await userRegister(req.body, "customer", res);
});

// admin Registration route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});

// Owner Registration route
router.post("/register-owner", async (req, res) => {
  await userRegister(req.body, "owner", res);
});

// broker Registration route
router.post("/register-broker", async (req, res) => {
  await userRegister(req.body, "broker", res);
});

// customer Login route
router.post("/login-customer", async (req, res) => {
  await userLogin(req.body, "customer", res);
});

// admin Login route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Owner Login route
router.post("/login-owner", async (req, res) => {
  await userLogin(req.body, "owner", res);
});

// broker Login route
router.post("/login-broker", async (req, res) => {
  await userLogin(req.body, "broker", res);
});

// profile route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// customer Protected route
router.get(
  "/customer-protected",
  userAuth,
  checkRole(["customer"]),
  async (req, res) => {}
);

// admin Protected route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {}
);

// Owner Protected route
router.get(
  "/owner-protected",
  userAuth,
  checkRole(["owner"]),
  async (req, res) => {}
);

// broker Protected route
router.get(
  "/broker-protected",
  userAuth,
  checkRole(["broker"]),
  async (req, res) => {}
);

module.exports = router;

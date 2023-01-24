const { userRegister } = require("../utils/Auth");

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
router.post("/login-customer", async (req, res) => {});

// admin Login route
router.post("/login-admin", async (req, res) => {});

// Owner Login route
router.post("/login-owner", async (req, res) => {});

// broker Login route
router.post("/login-broker", async (req, res) => {});

// profile route
router.get("profile", async (req, res) => {});

// customer Protected route
router.post("/customer-protected", async (req, res) => {});

// admin Protected route
router.post("/admin-protected", async (req, res) => {});

// Owner Protected route
router.post("/owner-protected", async (req, res) => {});

// broker Protected route
router.post("/broker-protected", async (req, res) => {});

module.exports = router;

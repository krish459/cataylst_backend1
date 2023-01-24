const router = require("express").Router();

// customer Resgitration route
router.post("/register-customer", async (req, res) => {});

// admin Registration route
router.post("/register-admin", async (req, res) => {});

// Owner Registration route
router.post("/register-owner", async (req, res) => {});

// broker Registration route
router.post("/register-broker", async (req, res) => {});

// customer Login route
router.post("/login-customer", async (req, res) => {});

// admin Login route
router.post("/login-admin", async (req, res) => {});

// Owner Login route
router.post("/login-owner", async (req, res) => {});

// broker Login route
router.post("/login-broker", async (req, res) => {});

// customer Protected route
router.post("/customer-profile", async (req, res) => {});

// admin Protected route
router.post("/admin-profile", async (req, res) => {});

// Owner Protected route
router.post("/owner-profile", async (req, res) => {});

// broker Protected route
router.post("/broker-profile", async (req, res) => {});

module.exports = router;

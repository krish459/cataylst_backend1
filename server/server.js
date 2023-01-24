require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const db = require("./db");
const app = express();
const passport = require("passport");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);

// user router middleware
app.use("/api/users", require("./routes/userRoute"));

app.get("/", (req, res) => {
  res.send("Server working branding ");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

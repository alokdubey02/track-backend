require("dotenv").config();
require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");

const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});

mongoose.connection.on("error", (err) => {
  console.log("error argument ", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email} ${req.user}`);
});
// , "192.168.183.104",
// app.listen(3000, "192.168.1.4", () => {
//   // app.listen(3000, "0.0.0.0", () => {
//   console.log("Backend running on port 3000");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

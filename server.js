const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD);
mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

app.use(express.json());

const userRoutes = require("./routes/user.routes");

app.use("/api", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

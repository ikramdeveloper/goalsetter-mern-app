const path = require("path");

// Environment Variables Configuration
require("dotenv").config();

const express = require("express");
const colors = require("colors");

const PORT = process.env.PORT || 8000;
const { connectMongo } = require("./config/db.config");

const { errorHandler } = require("./middlewares/error.middleware");
const goalsRouter = require("./routes/goals.router");
const usersRouter = require("./routes/users.router");

connectMongo();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalsRouter);
app.use("/api/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, resp) => {
    resp.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, resp) => resp.send("Please set to production"));
}

app.use(errorHandler);

app.listen(PORT, console.log(`Listening on port ${PORT}...`));

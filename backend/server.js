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

app.use(errorHandler);

app.listen(PORT, console.log(`Listening on port ${PORT}...`));

const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/users.controller");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", verifyToken, getUser);

module.exports = router;

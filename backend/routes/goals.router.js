const express = require("express");
const router = express.Router();

const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goals.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.route("/").get(verifyToken, getGoals).post(verifyToken, setGoal);
router
  .route("/:id")
  .put(verifyToken, updateGoal)
  .delete(verifyToken, deleteGoal);

module.exports = router;

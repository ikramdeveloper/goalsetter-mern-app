const asyncHandler = require("express-async-handler");

const Goal = require("../models/goal.model");
const User = require("../models/user.model");

const getGoals = asyncHandler(async (req, resp) => {
  const goals = await Goal.find({ user: req.user.id });

  resp.status(200).json(goals);
});

const setGoal = asyncHandler(async (req, resp) => {
  if (!req.body.text) {
    resp.status(400);
    throw new Error("please enter a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  resp.status(200).json(goal);
});

const updateGoal = asyncHandler(async (req, resp) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    resp.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    resp.status(400);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    resp.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  resp.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, resp) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    resp.status(400);
    throw new Error("Goal Not found");
  }

  if (!req.user) {
    resp.status(400);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== req.user.id) {
    resp.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  resp.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };

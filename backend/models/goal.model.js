const mongoose = require("mongoose");

const GoalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add a text field"],
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;

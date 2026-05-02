const mongoose = require("mongoose");

const heuristicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

heuristicSchema.index({ createdBy: 1, title: 1 }, { unique: true });

module.exports = mongoose.model("Heuristic", heuristicSchema);

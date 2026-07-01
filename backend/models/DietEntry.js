const mongoose = require("mongoose");

const DietEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    diet_plan: { type: String, required: true },
    bmi: Number,
    height: Number,
    weight: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("DietEntry", DietEntrySchema);

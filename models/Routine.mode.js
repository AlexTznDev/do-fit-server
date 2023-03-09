const { Schema, model } = require("mongoose");

const routineSchema = new Schema({
  name: String,
  exercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    }],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  frequency: String,
  status: {
    type: String,
    enum: ["public", "private"],
  },
});

const Routine = model("Routine", routineSchema);
module.exports = Routine;

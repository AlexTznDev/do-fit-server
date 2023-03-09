const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema({
  name: String,
  
  exercises: [{
    exercisesId :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise"
    },
      repeticion: Number,
      series: Number,
      chronometro: Number,
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

const Routine = mongoose.model("Routine", routineSchema);
module.exports = Routine;

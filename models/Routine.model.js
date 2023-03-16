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
  category: {
    type: String, // opcion possible: abdominal, calentamiento, legs, pecho, braso , estiramiento, excersisio de respiration, espalda
    enum: [
      "Abbs",
      "Upper body",
      "Lower body",
      "Stretching",
      "Breathings",
      "Cardio",
      "body weight",
    ],
  },

  frequency: String,
  status: {
    type: String,
    enum: ["public", "private"],
  },
});

const Routine = mongoose.model("Routine", routineSchema);
module.exports = Routine;

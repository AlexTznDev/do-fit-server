const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema ({
    name: String,
    creador:{
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
        "body weight"
      ],
    },
    calories: Number,
    description: String,
    videoUrl: String, //no estoy seguro
  
  });

  const Exercise = mongoose.model("Exercise", exerciseSchema)

  module.exports = Exercise;
  
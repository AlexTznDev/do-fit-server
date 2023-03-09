const {Schema, model} = require("mongoose")

const exerciseSchema = new Schema ({
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
  
    repeticion: Number,
    series: Number,
    chronometer: Number
  
  });

  const Exercise = model("Exercise", exerciseSchema)

  module.exports = Exercise;
  
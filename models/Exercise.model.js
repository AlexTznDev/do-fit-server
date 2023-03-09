const ExerciseSchema = {
    name: String,
    creador:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
    category: {
      type: String, // opcion possible: abdominal, calentamiento, legs, pecho, braso , estiramiento, excersisio de respiration, espalda
      enum: [
        "abdominal",
        "legs",
        "pecho",
        "braso",
        "estiramiento",
        "respiration",
        "espalda",
        "cardio"
      ],
    },
    calorie: Number,
    description: String,
    videoUrl: String, //no estoy seguro
  
    repeticion: Number,
    series: Number,
    chronometro: Number
  
  };
  
const {Schema, model} = require("mongoose")


const userSchema = new Schema({

  email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    role:{
      type:String,
      enum:["admin", "user"],
      default:"user"
    },
  password: {
      type: String,
      required: [true, 'Password is required.']
    },

  name: String,
  age: Number,
  peso: Number,
  altura: Number,
  imageProfil: String,
  friends:[
    
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      } 

    ]
},
{
    timestamps: true
 })


const User = model("User", userSchema)

module.exports( User)
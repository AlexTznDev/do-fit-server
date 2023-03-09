const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({

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
  weight: Number,
  height: Number,
  imageProfile: String,
  friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }]
},
{
  timestamps: true
 })


const User = mongoose.model("User", userSchema)

module.exports =  User;
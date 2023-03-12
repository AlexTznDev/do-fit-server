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
  imageProfile: {
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
  },
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
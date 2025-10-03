import mongoose from 'mongoose'

const { Schema } = mongoose;

const userSchema = new Schema({

    username : { type : String , required : [true , "Username is required"]},
    email : { type : String , required : [true , "Email is required"]},
    password : { type : String , required : [true , "Password is required"]},
    isActive : { type : String , default : true},
    isVerified : { type : String , default : false},
    role : { type : String , default : "user"},
    
});

const User = mongoose.model("User", userSchema);
export default User;
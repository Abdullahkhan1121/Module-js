import User from '../models/userModel.mjs';

// Add User
let addUser = async (req,res) =>{
    try {
      const user = req.body;
      let newUser = new User(
        {
          username:user.username,
          email:user.email,
          password:user.password,
        }
      )
  
      let adduser = await newUser.save();
      if (adduser) {
        res.status(200).json({message:"User Added",user:adduser });
      } else {
        res.status(400).json({ message: "User could not be Added" });
      }
  
      } 
      catch (error) {
        res.status(500).json({message:"Error"})
      }
  }

// Show Users
let index = async (req,res) =>{
    try {
      let users = await User.find();
      if (users) {
        res.status(200).json({message:"Showing All Users",Users:users });
      } else {
        res.status(400).json({ message: "Could not show any Users" });
      }
        
      } 
      catch (error) {
        res.status(500).json({message:"Error" })
      }
  }

// Fetch User by Id
let singleUser = async (req,res) =>{
    try {
      let id= req.params.id;
      let user = await User.findOne({_id:id});
      if (user) {
        res.status(200).json({message:"Showing User by Id",User:user});
      } else {
        res.status(400).json({ message: "Could not show any User" });
      }
        
      } 
      catch (error) {
        res.status(500).json({message:"Error" })
      }
  }

// Delete User
let deleteUser = async (req,res) =>{
    try {
      let id= req.params.id;
      let delUser = await User.deleteOne({ _id: id });
      if (delUser) {
        res.status(200).json({message:"Showing Deleted User",User:delUser});
      } else {
        res.status(400).json({ message: "Could not Delete User" });
      }
        
      } 
      catch (error) {
        res.status(500).json({message:"Error" })
      }
  }

// Edit User
let editUser = async (req,res) =>{
    try {
      let id= req.params.id;
      let user = await User.findOne({ _id: id });
      if (user) {
      const user = req.body;
      let updatedUser = new User(
        {
          _id:id,
          username:user.username,
          email:user.email,
          password:user.password,
        }
      )
  
      let updateuser = await User.updateOne({_id:id},updatedUser);
      if (updateuser) {
        res.status(200).json({message:"User Updated",user:updateuser });
      } else {
        res.status(400).json({ message: "User could not be updated" });
      }
      } else {
        res.status(400).json({ message: "User could not be updated" });
      }
  
      } 
      catch (error) {
        res.status(500).json({message:"Error"})
      }
  }



const userController = {
    addUser,
    index,
    singleUser,
    deleteUser,
    editUser
}

export default userController;
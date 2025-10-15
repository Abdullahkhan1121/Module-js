
import User from '../models/userModel.mjs';
import  bcrypt  from "bcrypt"

// fetch all products
let index =async (req, res) => {
   try {
    let users= await User.find();
    if (users) {
      res.status(200).json({message:"Our users",users:users});
      
    } else {
      res.status(500).json({message:"Failed to fetch users"});
      
    }
  
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

// add product
let Signup =async (req, res) => {
   try {
    const { username , email, password}=req.body;
    // checking if the user doesn't exist
    let checkUser= await User.findOne({email:email});
    if (checkUser) {
      res.status(200).json({message:"User already exist from this email. Please login..!"});
    } else {
      // hashing the password
      const hashPassword = bcrypt.hashSync( password   , 10);
      console.log(hashPassword);
      let newUser= new User(
        {
        username,
        email,
        password:hashPassword,
        }
      )
      let adduser =await newUser.save();
      if (adduser) {
        res.status(200).json({message:"Registration is sucessfull.",user:adduser});
        
      } else {
      
        res.status(500).json({message:"Failed to register user"});
      }
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}

let Login = async (req, res) =>{
  try {
    const { email , password}=req.body;
  let checkUser= await User.findOne({email:email});
  if (checkUser) {

    const checkPassword = bcrypt.compareSync(password  , checkUser.password)
    console.log(checkPassword)
    console.log(checkUser)
    
    if (checkPassword) {
      const token= await jwt.sign({checkUser}, process.env.jwt_secret,{expiresIn: '1h'});
      console.log(token);
      res.status(200).json({message:"login success....!", user:checkUser,token:token});

      
    } else {
      res.status(401).json({message:"Invalid credentials "});
    
    }
  } else {
    res.status(404).json({message:"user not found.please signup..!"});
    
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}




const userController= {
    index,
    Signup,
    Login
  
 }


 export default userController;
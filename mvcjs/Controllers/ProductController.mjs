import fs from  'node:fs';
import { title } from 'node:process';
import Product from '../models/productModel.mjs';
import Users from '../models/userModel.mjs';


let index = async(req, res) => {
  try {
   let products = await Product.find();
    if (products) {
     res.status(200).json({message:"All Product!",products:products});
   } else {
     res.status(404).json({message:"No User found"});
   }
 } catch (error) {
   console.log(error);
   res.status(500).json({message:error.message})
 }
}


let singleUser  = async(req, res) => {
  try {
      const id= req.params.id;
      let user = await Users.findById(id);
      if (user) {
          res.status(200).json({message:"User found",user});
      }
      else {
          res.status(404).json({message:"Error !"});
          }
      } catch (error) {
          console.log(error);
          res.status(500).json({message:error.message})
      }
}

let AddUsers = async (req, res) => {
  try {
      const  user = req.body;
      let newuser = new Users(
      {
          name:user.name,
          email:user.email,
          password:user.password
      }
      )
      let addUser = await newuser.save();

      if (addUser) {
      res.status(200).json({message:"User Added!",user:addUser});
      } else {
      res.status(404).json({message:"Error !"});
      }
} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
}
}


let deleteUsers = async(req, res) => {
  try {

const id = req.params.id;
let deleteuser = await Users.findByIdAndDelete(id)

if (deleteuser) {
res.status(200).json({message:"User has been deleted",deleteuser});
} else {
res.status(404).json({message:"No User found"});
}
} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
}
}

let updateUser  = async(req, res) => {
  try {
const id= req.params.id;
const updateUser = req.body;
const updateData = await Users.findByIdAndUpdate(id,updateUser,{new : true, runValidators: true});
if (updateData) {
  res.status(200).json({message:"User Updated",updateData});
  
} else {
  res.status(404).json({message:"Error"});
}

} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
}
}
let singleProduct  = async(req, res) => {
  try {
const id= req.params.id;
let product = await Product.findById(id);
if (product) {
  res.status(200).json({message:"product found",product});
  
} else {
  
}

} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
}
}

let AddProduct = async (req, res) => {
    try {
const  product = req.body;
let newproduct = new Product(
  {
    title:product.title,
    description:product.description,
    price:product.price,
    discountPercentage:product.discountPercentage,
    stock:product.stock,
    brand:product.brand,
    category:product.category,
    images:product.images
  }
)
let addprod = await newproduct.save();

if (addprod) {
  res.status(200).json({message:"Product Added!",product:addprod});
} else {
  res.status(404).json({message:"No product found"});
}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}


let deleteproduct = async(req, res) => {
    try {

// let newproduct = req.body
// let addproduct = products.push(newproduct)
// })
const id = req.params.id;
let deleteprod = await Product.findByIdAndDelete(id)

if (deleteprod) {
  res.status(200).json({message:"Product has been deleted",deleteprod});
} else {
  res.status(404).json({message:"No product found"});
}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}


let updateProduct  = async(req, res) => {
  try {
const id= req.params.id;
const updateProduct = req.body;
const updateData = await Product.findByIdAndUpdate(id,updateProduct,{new : true, runValidators: true});
if (updateData) {
  res.status(200).json({message:"Product Updated",updateData});
  
} else {
  
}

} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
}
}


let AddProductImage = async (req, res) => {
  try {
    let imageArray = [];
    req.files.forEach(element => {
      imageArray.push(element.path)
    });
const  product = req.body;
let newproduct = new Product(
{
  title:product.title,
  description:product.description,
  price:product.price,
  discountPercentage:product.discountPercentage,
  stock:product.stock,
  brand:product.brand,
  category:product.category,
  images:imageArray
}
)
let addprod = await newproduct.save();

if (addprod) {
res.status(200).json({message:"Product Added!",product:addprod});
} else {
res.status(404).json({message:"No product found"});
}
} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
}
}


const productController= {
    index,
    AddProduct,
    singleProduct,
    deleteproduct,
    updateProduct,
    AddUsers,
    singleUser,
    deleteUsers,
    updateUser,
    AddProductImage

 }


 export default productController;
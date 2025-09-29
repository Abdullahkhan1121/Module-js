import fs from 'node:fs';
import Product from '../models/productModel.mjs';

// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// let products = data.products;

let index = (req,res) =>{
    try {
        res.status(200).json({message:"Products Found",Product:products })
      } 
      catch (error) {
        res.status(404).json({message:"Products Not Found" })
      }
}

// let singleProduct =(req, res) => {
//     try {
// let id= req.params.id;
// let product = products.find((prd)=>{
//   return prd.id== id
// })
// if (product) {
//   res.status(200).json({message:"Product found", Product:product});
// } else {
//   res.status(404).json({message:"No product found"});
// }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message:error.message})
//   }
// }

// let addProduct = (req, res) =>{
//     try {
//   let newproduct= req.body;
//   let addproduct= products.push(newproduct);
//   if (addproduct) {
//     res.status(200).json({message:"product Added", Product:newproduct });
//   } else {
//     res.status(404).json({message:"product Not Added" });
//   }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({message:error.message});
//     }
//   }

// let deleteProduct = (req, res) => {
//   try {
//     let id = req.params.id;
//     let deletedproduct = products.find((item) => {
//       return item.id == id;
//     })

//     let filteredproducts = products.filter((item)=> {
//       return item.id != id;
//     })
//     console.log(deletedproduct)
//     products = filteredproducts;

//     if (filteredproducts) {
//       res.status(200).json({ message: "product deleted successfully", Product: deletedproduct });
//     }
//     else {
//       res.status(404).json({ message: "product cann't be deleted!" });
//     }
//   }
//   catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message })
//   }
// }

  // Add Product
let addProduct = async (req,res) =>{
  try {
    const product = req.body;
    let newProduct = new Product(
      {
        title:product.title,
        description:product.description,
        price:product.price,
        discountPercentage:product.discountPercentage,
        rating:product.rating,
        stock:product.stock,
        brand:product.brand,
        category:product.category,
        images:product.images,
      }
    )

    let addprod = await newProduct.save();
    if (addprod) {
      res.status(200).json({message:"Product Added",product:addprod });
    } else {
      res.status(400).json({ message: "Product could not be Added" });
    }

    } 
    catch (error) {
      res.status(500).json({message:"Error"})
    }
}


const productController= {
    index,
    // singleProduct,
    // addProduct,
    // deleteProduct
    addProduct
 }


 export default productController;
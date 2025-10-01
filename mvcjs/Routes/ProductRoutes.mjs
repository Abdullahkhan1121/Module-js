import express from 'express'
import productController from '../Controllers/ProductController.mjs';

const productRouter= express.Router();

productRouter
// .get("/",productController.index)
// .get("/:id",productController.singleProduct)
// .post("/add",productController.addProduct)
// .delete("/delete",productController.deleteProduct)

// Get
.get("/",productController.index)
.get("/:id",productController.singleProduct)
.get("/brand/:brand",productController.singleProduct)

// Post
.post("/add",productController.addProduct)

// Delete
.delete("/:id",productController.deleteProduct)

// Put
.put("/:id",productController.editProduct)

//Patch


export default productRouter;
import express from 'express'
import productController from '../Controllers/ProductController.mjs';

const productRouter= express.Router();

productRouter
.get("/",productController.index)
// .get("/:id",productController.singleProduct)
// .post("/add",productController.addProduct)
// .delete("/delete",productController.deleteProduct)
// Work
.post("/add",productController.addProduct)


export default productRouter;
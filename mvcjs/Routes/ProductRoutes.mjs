import express from 'express'
import productController from '../Controller/ProductController.mjs';

const productRouter= express.Router();

productRouter
.get("/",productController.index)
.get("/:id",productController.singleProduct)
.post("/add",productController.addProduct)
.delete("/delete",productController.deleteProduct)


export default productRouter;
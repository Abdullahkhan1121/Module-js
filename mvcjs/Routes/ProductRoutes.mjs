import express from 'express'
import productController from '../Controllers/ProductController.mjs';
import { upload } from '../cloudinarConfig.mjs';
import auth from '../middleware/auth.mjs';
import AdminAuth from '../middleware/adminAuth.mjs';

const productRouter= express.Router();


// productRouter.get("route",function)
productRouter
// .get("/",productController.index)

.get("/:id",productController.singleProduct)
.delete("/deleteproduct/:id",productController.deleteproduct)
.post("/AddProduct/" , AdminAuth,productController.AddProduct)
.put("/UpdateProduct/:id",productController.updateProduct)

// .get("/",auth,productController.index)
.get("/",productController.index)

.post("/AddProductImage", upload.array("image") ,productController.AddProductImage)



export default productRouter;
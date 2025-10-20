import express from 'express'
import productController from '../Controllers/ProductController.mjs';
import { upload } from '../cloudinaryConfig.mjs';
import auth from '../controllers/middlewares/auth.mjs';
import AdminAuth from '../controllers/middlewares/adminAuth.mjs';

const productRouter= express.Router();


// productRouter.get("route",function)
productRouter
// .get("/",productController.index)
.get("/:id",productController.singleProduct)
.delete("/deleteproduct/:id",productController.deleteproduct)
.post("/AddProduct/" , AdminAuth,productController.AddProduct)
.put("/UpdateProduct/:id",productController.updateProduct)



.get("/",auth,productController.index)
.get("/user/:id",productController.singleUser)
.delete("/deleteUsers/:id",productController.deleteUsers)
.post("/AddUsers",productController.AddUsers)
.put("/UpdateUsers/:id",productController.updateUser)

.post("/AddProductImage", upload.array("image") ,productController.AddProductImage)



export default productRouter;
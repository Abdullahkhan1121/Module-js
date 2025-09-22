import mongoose from 'mongoose'

const { Schema } = mongoose;

const productSchema = new Schema({

    title : { type : String , required : [true , "Title is required"]},
    description : { type : String },
    price : { type : number , required : [true , "Price is required"]},
    discountPercentage : { type : number ,
        required : [true , "Price is required"],
        min:[0 , "Minimum discount of product must be 0"],
        max:[50 , "Maximum discount of product must be 50"]
    },
    rating : { type : number ,
        default : 0,
        min:[0 , "Minimum rating of product must be 0"],
        max:[5 , "Maximum rating of product must be 5"]
    },
    
});

const Product = mongoose.model("Product", productSchema);
export default Product;
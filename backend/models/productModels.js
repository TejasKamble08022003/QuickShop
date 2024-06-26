const mongoose =require("mongoose");

const productSchema = mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please Enter Product Name"],
    trim:true
  },
  description:{
    type:String,
    required:[true,"Please Enter Product Description"]
  },

  price:{
    type:Number,
    required:[true,"Please Enter Product Price"],
    maxLenght:[8,"Price cannot exceed 8 character"]
  },
  ratings:{
    type:Number,
    default:0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category:{
    type:String,
    required:[true,"Please Enter Product Category"]
  },
  stock:{
    type:Number,
    required:[4,"Stock cannot exceed 4 characters"]
  },
  noOfReviews:{
    type:Number,
    default:0
  },
  reviews:[{

    user:{
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required:true,
    },

    name:{
    type:String,
    required:true,
  },

    rating:{
    type:String,
    required:true,
  },

    comment:{
    type:String,
    required:true,
  },   
  },
],

  user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required:true,
  },

  date:{
    type:Date,
    default:Date.now
  },


});


module.exports =mongoose.model("Product",productSchema)

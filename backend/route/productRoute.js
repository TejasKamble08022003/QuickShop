const express= require("express");
const { getALLProducts,createProduct,updateProduct,deleteProduct,getProductDetails, createProductReview, getAllReviews, deleteReview } = require("../control/productControl");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");


const router =express.Router();



router.route("/products").get(getALLProducts);


router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router
.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)


router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getAllReviews).delete(isAuthenticatedUser,deleteReview);


module.exports=router
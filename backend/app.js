
const cors = require("cors");
const express = require ("express");
const app= express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware=require("./middleware/error");


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());



// Route Imports
const product = require("./route/productRoute");
const user = require("./route/userRoute");
const order = require("./route/orderRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

// Middleware for error
app.use(errorMiddleware);


module.exports=app
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const getResetPasswordToken = require("../models/userModel");
const crypto = require("crypto");
//register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is sample id",
            url:"sample url",
        },
    });

    sendToken(user,201,res);
});


//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password} =req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter valid email & Password",400));

    }

    const user= await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Please enter valid user & Password",401));
    }

    const isPasswordMatched = user.comparePassword(password);


    if(!isPasswordMatched){
        return next(new ErrorHandler("Please enter valid user & Password",401));
    }

    sendToken(user,200,res);
})


//logout user

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
       expires : new Date(Date.now()),
       httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message: "Logged Out",
    });
});


//forget PAssword
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({ email: req.body.email });
    
    if(!user){
        return next(new ErrorHandler("User noy found",404));
    }

    // get resetPassword token
 
    const resetToken = user.getResetPasswordToken();

    
    await user.save({ validBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    
    const message = ` Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it `;

    try {

        await sendEmail({
           email: user.email,
           subject: `Ecommerce Password recovery`,
           message,
        });

        console.log(res);
        res.status(200).json({
            succes:true,
            message:`Email sent to ${user.email} successfully`,
        });
    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave:false });

        return next(new ErrorHandler(error.message,500));
    }
});

//reset password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{

    
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt : Date.now()},

    });
    
    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.password ;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(req,200,res);

});

// Get User Details
exports.getUserDetails= catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});


// Change User Password
exports.updatePassword= catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("old password is incorrect",401));
    }

    if(req.body.newPassword !==req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",401));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);

    
});


// update User profile
exports.updateProfile= catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name: req.body.name,
        email: req.body.email,
    };

    //We will add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id ,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    });

   

    res.status(200).json({
        success:true,
        

    });

    
});

//get all user (admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users,
    });
});

//get single user (admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`USer of ${req.params.id} not found`,400))
    }
    res.status(200).json({
        success:true,
        user,
    });
});


// update User details (admin)
exports.updateUser= catchAsyncErrors(async(req,res,next)=>{

    const newUserData={
        name: req.body.name,
        email: req.body.email,
        role:req.body.role,
    };

   

    const user = await User.findByIdAndUpdate(req.user.id ,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    });

   

    res.status(200).json({
        success:true,
        

    });

});

    // delete User details (admin)
exports.deletUser= catchAsyncErrors(async(req,res,next)=>{

  const user = await User.findById(req.params.id );

    if(!user){
        return next(new ErrorHandler(`USer of ${req.params.id} not found`,400))
    }
   
    await user.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success:true,
        message:"USer is deleted succesfully",

    });
    
});


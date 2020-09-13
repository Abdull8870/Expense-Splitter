const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer');
const sendgridTransport =require('nodemailer-sendgrid-transport');
const User = require("../models/user");
const SingUp = require("../models/signup");
const crypto =require('crypto');
const common = require('./commonLibs/commonfunc');

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_user: "Your own Api"
  }
}));


//This if for getting the phonecodes and number of countries for signup purpose

exports.getCode = (req, res, next) => {
  const id='5f5cd0e718a7ea249c50684f';
  SingUp.findOne({_id:id})
    .then(code => {
      if (code) {
          res.status(200).json({ message: "SUCCESS",countries:code.countries,phoneCode:code.phoneCode });
      } else {
        res.status(404).json({ message: "NO DATA FOUND" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "GETTING COUNTRY CODES FAILED"
      });
    });
  }

//Creating the user

exports.createUser = (req, res, next) => {
  const email=req.body.email.toLowerCase();
  const firstName=req.body.firstName;
  const lastName=req.body.lastName;
  const country=req.body.country;
  const phoneNumber=req.body.phoneNumber;
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email:email,
      password: hash,
      firstName:firstName,
      lastName:lastName,
      country:country,
      phoneNumber:phoneNumber
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "User already exist kindly login or reset your password"
        });
      });
  });
}

/*functionality to check the login of the user and it'll thwor an error
  if email not found or passoword entered is INCORRECT
 */

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email.toLowerCase() })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(401).json({
          message: "USER DOESN'T EXIST KINDLY SIGNUP"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "INCORRECT USERNAME AND PASSWORD"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id,firstName:fetchedUser.firstName,
        lastName:fetchedUser.lastName },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
      return transporter.sendMail({
        to:fetchedUser.email,
        from:'abdull8870temp@gmail.com',
        subject:"Logged in Successfully",
        html:`<h1>You Have logged in into
        successfully into the Expense splitter</h1>`
      });
    }).catch((err) => {
      return res.status(401).json({
        message: "SOME INTERNAL ERROR OCCURED"
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

/*  functionality for resetting the password here
    the reset code for password reset will be send to your
    email
 */


exports.userReset =(req,res,next)=>{
  let secretCode=Math.floor(Math.random()*90000) + 10000;
  secretCode=secretCode;
  let userId;
  console.log("inside reset");
  const _email=req.body.email.toLowerCase();
  console.log(_email);
  crypto.randomBytes(32,(err,buffer)=>{
    if(err)
    {
      return res.status(500).json({
        message: "SOME INTERNAL ERROR OCCURED"
      });
    }
    const token=buffer.toString('hex');
    User.findOne({ email:_email }).then(user=>{
      console.log(user);
      if(!user)
      {    console.log("no user");
        return res.status(401).json({
          message: "Email Not found"
        });
      }
      userId=user._id;
      user.resetToken=secretCode;
      user.resetTokenExpiration=Date.now() + 360000;
      return user.save();
    }).then(result=>{
      return transporter.sendMail({
        to:_email,
        from:'abdull8870temp@gmail.com',
        subject:"PASSWORD RESET",
        html:`<p>Your password reset Code is <b> ${secretCode} <b></p>`
      });
    }).then(resut=>{
      console.log(resut);
      return res.status(200).json({
       message: "Reset Link has been Sent Successfully",
       id:userId
     });
    }).catch((err) => {
      console.log(err);
    })

  });


}

/*  functionality to reset the password onlyif code matched with
code we sent
 */

exports.resetPassword=(req,res,next)=>{
  let resetUser;
  const token=req.body.token;
  const password=req.body.password;
  const id=req.body.id;
  const date=Date.now();
  console.log(id);
  console.log(token);
  User.findOne({_id:id,resetToken:token,resetTokenExpiration:{$gt:date}}).
  then((user) => {
    console.log(user);
    resetUser=user;
    return bcrypt.hash(password,12);
  }).then(hashedPassword=>{
    resetUser.password=hashedPassword;
    resetUser.resetToken=undefined;
    resetUser.resetTokenExpiration=undefined;
    return resetUser.save();
  }).then(result=>{
    return res.status(200).json({
     message: "Your password Has been Reset Successfully"
   });
 }).catch((err) => {
   return res.status(401).json({
     message: "Email Id not found"
   });
 });
}

const History = require("../models/history");
const nodemailer=require('nodemailer');
const sendgridTransport =require('nodemailer-sendgrid-transport');

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_user: "  You own sendGridApi     "
  }
}));



let saveHistory = (history,cb) => {

   const histry=new History({
   action:history.action,
   doneBy:history.doneBy,
   description:history.description,
   projectid:history.projectId,
   });
   histry.save().
   then((result) => {
     cb(null,"SUCCESS");
   }).catch((err) => {
     cb(err,"error");
   });
  };



  let sendMail=(users,desc,subject,cb)=>{
      transporter.sendMail({
      to:users,
      from:'abdull8870temp@gmail.com',
      subject:subject,
      html:`<html>${desc}</html>`
    }).
    then((result) => {
       cb(null,"SUCCESS");
      }).catch((err) => {
         cb(err,"error");
      })
  };





  module.exports = {
    save: saveHistory,
    mail: sendMail
  }

const Project = require("../models/project");
const History = require("../models/history");
const io = require('../socket');
const common = require('./commonLibs/commonfunc');

//to save the bill generated to the database
// checking git

exports.postBillDetails = (req, res, next) => {
  const subject="NEW BILL ADDED TO AN EXPENSE"
  const history=req.body.history;
  history.doneBy=`${req.userData.firstName} ${req.userData.lastName}`;
  const projectID=req.body.projectId;
  const bill=req.body.bill;
  Project.findOne({_id:projectID})
    .then(project => {
      if (project) {
        project.bills.push(bill);
        return project.save();
      } else {
        res.status(404).json({ message: "PROJECT NOT FOUND!" });
      }
    }).then(result=>{
      common.save(history,(err,data)=>{
        if(!err){
          common.send(result.users,history.description,subject,(err,data)=>{
            if(!err){
              console.log("SUCCESS");
            }
          });
        }
          });
      io.getIO().emit('billCreate', { action: 'New Bill Created',
      email:result.users,
      projectId:result._id,
      projectName:result.name,
      project:result,
      by:`${req.userData.firstName} ${req.userData.lastName}`});
      res.status(200).json({ message: "SUCCESS",bill:result });
    })
    .catch(error => {
      res.status(500).json({
        message: "POSTING THE BILL FAILED"
      });
    });
};


//Retreving the bill from the database

exports.getBillDetails = (req, res, next) => {
  const projectID=req.body.projectId;
  Project.findOne({_id:projectID})
    .then(project => {
      if (project) {
          res.status(200).json({ message: "SUCCESS",bill:project });
      } else {
        res.status(404).json({ message: "PROJECT NOT FOUND!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "FETCHING BILL FAILED!"
      });
    });
};

/* To delete a particular bill of a project */

exports.deteleBill = (req, res, next) => {
  const subject="BILL HAS BEEN DELETED"
  const projectID=req.body.projectId;
  const billId=req.body.billId;
  const bill=req.body.bill;
  const history=req.body.history;
  history.doneBy=`${req.userData.firstName} ${req.userData.lastName}`;
  Project.findOne({_id:projectID})
    .then(project => {
      if (project) {
        project.bills.pull(billId);
         return project.save();
      } else {
        res.status(404).json({ message: "BILL NOT FOUND!" });
      }
    }).then(result=>{

      io.getIO().emit('billDelete', { action: 'Bill Deleted',
      email:result.users,
      project:result,
      projectId:result._id,
      projectName:result.name,
      by:`${req.userData.firstName} ${req.userData.lastName}`});
      common.save(history,(err,data)=>{
        if(!err){
          common.send(result.users,history.description,subject,(err,data)=>{
            if(!err){
              console.log("SUCCESS");
            }
          });
        }
          });
      res.status(200).json({ message: "SUCCESS",bill:result });
    })
    .catch(error => {
      res.status(500).json({
        message: "DELETING BILL HAS BEEN FAILED!"
      });
    });
};

/* To update a particular bill of a project */

exports.updateBill = (req, res, next) => {

  const subject="BILL HAS BEEN UPDATED"
  const bill=req.body.bill;
  const projectID=req.body.projectId;
  const billId=req.body.billId;
  const history=req.body.history;
  history.doneBy=`${req.userData.firstName} ${req.userData.lastName}`;
  Project.findOne({_id:projectID})
    .then(project => {
      if (project) {
        let index=project.bills.findIndex((bill)=>{
         if (bill._id==billId)
          return bill;
            });
          project.bills[index]=bill;
         return project.save();
      } else {
        res.status(404).json({ message: "BILL NOT FOUND!" });
      }
    }).then(result=>{
      io.getIO().emit('billUpdate', { action: 'Bill updated',
      email:result.users,
      project:result,
      projectId:result._id,
      projectName:result.name,
      by:`${req.userData.firstName} ${req.userData.lastName}`});
      common.save(history,(err,data)=>{
        if(!err){
          common.send(result.users,history.description,subject,(err,data)=>{
            if(!err){
              console.log("SUCCESS");
            }
          });
        }
          });
      res.status(200).json({ message: "SUCCESS",bill:result });
    })
    .catch(error => {
      res.status(500).json({
        message: "UPDATING BILL FAILED!"
      });
    });
};

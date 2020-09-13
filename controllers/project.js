const Project = require("../models/project");
const History = require("../models/history");
const io = require('../socket');
const common = require('./commonLibs/commonfunc');


//Saving the project created by the user to mongoDB


exports.createProject = (req, res, next) => {
  const subject="YOU HAVE BEEN ADDED TO AN EXPENSE"
  const usersEmail=req.body.users;
  const history=req.body.history;
  const project = new Project({
    name: req.body.name,
    createdBy: req.body.createdBy,
    users: req.body.users,
    creator: req.userData.userId
  });
  project
    .save()
    .then(createdProject => {
        history.projectId=createdProject._id;
        history.doneBy=`${req.userData.firstName} ${req.userData.lastName}`;
        common.save(history,(err,data)=>{
          if(!err){
            common.send(usersEmail,history.description,subject,(err,data)=>{
              if(!err){
                console.log("SUCCESS");
              }
            });
          }
            });
        io.getIO().emit('createProject', { action: 'New Expene Created',
        email:usersEmail,
        name:createdProject.name,
        by:`${req.userData.firstName} ${req.userData.lastName}`});
        res.status(201).json({
        message: "PROJECT ADDED SUCCESSFULLY",
        post: {
          ...createdProject,
          id: createdProject._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "CREATING A PROJECT FAILED"
      });
    });
};

//Retrieving the project related to connected user

exports.getProject = (req, res, next) => {
  const userId=req.userData.userId;
  const email=req.userData.email.toLowerCase();
  Project.find()
    .then(allproject => {
      if (allproject) {
        const project=allproject.filter((x)=>x.users.includes(email));
        res.status(200).json({message:'SUCCESS',
        project:project});
      } else {
        res.status(404).json({ message: "PROJECT NOT FOUND!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "FETCHING PROJECT FAILED!"
      });
    });
};


///Function to delete the posted project

exports.deletePost = (req, res, next) => {
  const dp=req.query.dp;
  const users=req.query.users;
  const subject="PROJECT HAS BEEN DELETED"
  const desc=`An Expense project which includes you has been deleted by
   ${req.userData.firstName} ${req.userData.lastName}`
    Project.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.n > 0) {
        io.getIO().emit('deleteProject', { action: 'PROJECT DELETED',
        email:users,
        name:dp,
        by:`${req.userData.firstName} ${req.userData.lastName}`});
        common.save(history,(err,data)=>{
          if(!err){
            common.send(users,history.description,subject,(err,data)=>{
              if(!err){
                console.log("SUCCESS");
              }
            });
          }
            });
        res.status(200).json({ message: "DELETION SUCCESSFULL!" });
      } else {
        res.status(401).json({ message: "NOT AUTHORIZED!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "DELETING PROJECT FAILED!"
      });
    });
};

//Retrieving the single project details

exports.getSingleProject = (req, res, next) => {
  const userId=req.userData.userId;
  const id=req.params.id;
  Project.find({ _id:id})
    .then(project => {
      if (project) {
        res.status(200).json({message:'SUCCESS',
        project:project});
      } else {
        res.status(404).json({ message: "PROJECT NOT FOUND!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "FETCHING PROJECT FAILED!"
      });
    });
};

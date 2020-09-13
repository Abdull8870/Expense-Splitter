const Project = require("../models/project");
const History = require("../models/history");
const common = require('./commonLibs/commonfunc');
/*
  Saving the expense details in the database
*/


exports.postExpense = (req, res, next) => {
  const projectID=req.body.projectId;
  const expense=req.body.expense;
  Project.findOne({_id:projectID})
    .then(project => {
      if (project) {
        project.expenses=[];
        expense.forEach(elem => {
            project.expenses.push(elem);
        });
        return project.save();
      } else {
        res.status(404).json({ message: "PROJECT NOT FOUND!" });
      }
    }).then(result=>{
      res.status(200).json({ message: "SUCCESS",expense:result });
    })
    .catch(error => {
      res.status(500).json({
        message: "POSTING EXPENSE INTO DATABASE FAILED!"
      });
    });
};

/*
  Saving the expense details in the database

*/

exports.getExpense = (req, res, next) => {
  const projectID=req.body.projectId;
  Project.findOne({_id:projectID})
    .then(project => {
      if (project) {
          res.status(200).json({ message: "SUCCESS",expense:project });
      } else {
        res.status(404).json({ message: "EXPENSE NOT FOUND!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "FETCHING EXPENSE FAILED!"
      });
    });
};

//Getting history of a particular project

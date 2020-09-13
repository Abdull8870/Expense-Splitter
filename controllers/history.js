const Project = require("../models/project");
const History = require("../models/history");
const common = require('./commonLibs/commonfunc');

//Get History all actions done on a project

exports.getHistory = (req, res, next) => {
  const projectID=req.query.projectId;
  History.find({projectid:projectID})
    .then(project => {
      if (project) {
          res.status(200).json({ message: "SUCCESS",history:project });
      } else {
        res.status(404).json({ message: "HISTORY NOT FOUND!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "FETCHING HISTORY FAILED!"
      });
    });
};


//delete the history related to particular project hwhen the project itself is deleted

exports.deleteHistory = (req, res, next) => {
  const id=req.params.id;
  History.deleteMany({projectid:id })
    .then(result => {
        if (result.n > 0) {
        res.status(200).json({ message: "DELETION SUCCESSFULL!" });
      } else {
        res.status(401).json({ message: "NOT AUTHORIZED!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "DELETING HISTORY FAILED!"
      });
    });
};

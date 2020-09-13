const express = require("express");

const historyController = require("../controllers/history");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("",checkAuth,historyController.getHistory);

/**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {get} /api/history/  used to get the history of a particular project in the database
     *
     * @apiParam {string} projectID to which this expense need to be saved. (query params) (required)
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, history.
     *
     * @apiSuccessExample {object} Success-Response:
         {
              {
                message: "SUCCESS",
                history: {
                  projectid: ObjectId of the project,
                  action:CREATE,
                  doneBy: testUser@splitter.com,
                  description:testUser@splitter.com Has Created the Expense Project on
                  Sun Sep 13 2020 20:04:44 GMT+0530 (India Standard Time)
                       }
               }

        }
    */



router.delete("/:id",checkAuth,historyController.deleteHistory);


/**
     * @apiGroup history
     * @apiVersion  1.0.0
     * @api {delete} /api/history/:id  used to delete the history of a particular project in the database
     *
     * @apiParam {string} projectID to which this expense need to be saved. (body params) (required)
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code.
     *
     * @apiSuccessExample {object} Success-Response:
         {
              {
                message: ""DELETION SUCCESSFULL!",
               }

        }
    */

module.exports = router;

const express = require("express");

const expenseController = require("../controllers/expense");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.post("",checkAuth,expenseController.postExpense);

/**     projectId:id,
        expense:_expense
     * @apiGroup bill
     * @apiVersion  1.0.0
     * @api {post} /api/expense/  used to store the expense data into the database
     *
     * @apiParam {string} projectID to which this expense need to be saved. (body params) (required)
     * @apiParam {object} expense expense details which need to be saved. (body params) (required)
     * @apiParam  {string} auth token (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, expense.
     *
     * @apiSuccessExample {object} Success-Response:
         {
              {
                message: "SUCCESS",
                expense: {
                  name: Project Name,
                  createdBy: Abdul,
                  users: [testuser@gmail.com, testUser2@gmail.com],
                  creator: Creator ObjectID,
                  bills:[
                    {
                      name:Movie,
                      payer:testuser@splitter.com,
                      to:[{user1@splitter.com,user2@splitter.com}],
                       amount:500
                     }],
                  expenses:[
                    {
                      name:testuser@splitter.com,
                      to:testUser2@splitter.com,
                      amount:50
                    },
                    {
                      name:testuser2@splitter.com,
                      to:testUser@splitter.com,
                      amount:50
                    }
                  ]
                }
               }

        }
    */


router.post("/get",checkAuth,expenseController.getExpense);

/**
     * @apiGroup expense
     * @apiVersion  1.0.0
     * @api {post} /api/get/  used to retrive the expense data of a particular project
     *
     * @apiParam {string} projectID to which this expense need to be saved. (body params) (required)
     * @apiParam  {string} auth token (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, expense.
     *
     * @apiSuccessExample {object} Success-Response:
         {
              {
                message: "SUCCESS",
                expense: {
                  name: Project Name,
                  createdBy: Abdul,
                  users: [testuser@gmail.com, testUser2@gmail.com],
                  creator: Creator ObjectID,
                  bills:[
                    {
                      name:Movie,
                      payer:testuser@splitter.com,
                      to:[{user1@splitter.com,user2@splitter.com}],
                       amount:500
                     }],
                  expenses:[
                    {
                      name:testuser@splitter.com,
                      to:testUser2@splitter.com,
                      amount:50
                    },
                    {
                      name:testuser2@splitter.com,
                      to:testUser@splitter.com,
                      amount:50
                    }
                  ]
                }
               }

        }
    */




module.exports = router;

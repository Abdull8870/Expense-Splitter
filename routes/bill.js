const express = require("express");

const billController = require("../controllers/bill");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("",checkAuth,billController.postBillDetails);

/**
     * @apiGroup bill
     * @apiVersion  1.0.0
     * @api {post} /api/bill/  saving the bill details of the respective projects in the database
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiParam  {string} auth token (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, bill.
     *
     * @apiSuccessExample {object} Success-Response:
         {
              {
                message: "SUCCESS",
                bill: {
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


// this router has been removed
router.post("/get",checkAuth,billController.getBillDetails);

router.post("/delete",checkAuth,billController.deteleBill);

/**
     * @apiGroup bill
     * @apiVersion  1.0.0
     * @api {post} /api/bill/delete  saving the bill details of the respective projects in the database
     *
     * @apiParam {string} billId to be deleted. (body params) (required)
     * @apiParam {string} projectId of the bill. (body params) (required)
     * @apiParam  {object} history to save in the database (body params) (required)
     * @apiParam  {string} auth token (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, bill.
     * @apiSuccessExample {object} Success-Response:
         {
            {
              message: "SUCCESS",
              bill:{
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
    */    billId:bill._id,
      projectId:projectId,
      bill:bill,
      history:history

router.put("/update",checkAuth,billController.updateBill);

/**
     * @apiGroup bill
     * @apiVersion  1.0.0
     * @api {post} /api/bill/delete  saving the bill details of the respective projects in the database
     *
     * @apiParam {string} billId to be deleted. (body params) (required)
     * @apiParam {object} bill to be deleted. (body params) (required)
     * @apiParam {string} projectId of the bill. (body params) (required)
     * @apiParam  {object} history to save in the database (body params) (required)
     * @apiParam  {string} auth token (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, bill.
     * @apiSuccessExample {object} Success-Response:
         {
            {
              message: "SUCCESS",
              bill:{
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

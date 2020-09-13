const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);


/**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/user/signup  used to signup a new user and store the values in the database
     *
     * @apiParam {object} data to which contains all the information user enters. (body params) (required)
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, result.
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
             message: "User created!",
             result: result
           }
        }
    */


router.post("/login", UserController.userLogin);

/**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/user/login  used to login the user
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows , message, http status code, token,expiresIn,userId
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
             token: token,
             expiresIn: 3600,
             userId: Object Id of the user
           }
        }
    */


router.post("/reset", UserController.userReset);

/**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/user/reset  used to send the secret code to the user for resetting the password
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows , message, http status code, message,id
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
            message: "Reset Link has been Sent Successfully",
            id:Object Id of the user
          }
        }
    */


router.post("/resetPassword", UserController.resetPassword);

/**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {post} /api/user/resetPassword  used to reset the password of the user
     *
     * @apiParam {string} password new password of the user. (body params) (required)
     * @apiParam {string} token secret token to reset the password. (body params) (required)
     * @apiParam {string} id ObjectId of the user. (body params) (required)
     * @apiSuccess {object} myResponse shows , message, http status code, message,id
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
            message: "Reset Link has been Sent Successfully",
            id:Object Id of the user
          }
        }
    */

router.get("/countrycodes", UserController.getCode);


/**
     * @apiGroup user
     * @apiVersion  1.0.0
     * @api {get} /api/user/countrycodes  called when user tries to signup
     *
     * @apiSuccess {object} myResponse shows , message, http status code, message,countries,phoneCode
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
             message: "SUCCESS",
             countries:['string','string','string'......],
             phoneCode:[{ code:String,num:String},{code:String,num:String},{code:String,num:String}]
           }
        }
    */


module.exports = router;

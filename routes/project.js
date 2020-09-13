const express = require("express");

const ProjectController = require("../controllers/project");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("",checkAuth,ProjectController.createProject);

/**
     * @apiGroup project
     * @apiVersion  1.0.0
     * @api {post} /api/project/  used to store the project information in the database
     *
     * @apiParam {string} projectID to which this expense need to be saved. (query params) (required)
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, post.
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
           message: "PROJECT ADDED SUCCESSFULLY",
           post: {
             _id: projectID
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
           ,
             id: ProjectID
           }
         }
        }
    */




router.get("",checkAuth,ProjectController.getProject);

/**
     * @apiGroup project
     * @apiVersion  1.0.0
     * @api {get} /api/project/  used to get the projects of the current user
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, project.
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
           message: "SUCCESS",
           project: {
             _id: projectID
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
        }
    */



router.get("/:id",checkAuth,ProjectController.getSingleProject);

/**
     * @apiGroup project
     * @apiVersion  1.0.0
     * @api {get} /api/project/:id  used to get the single project the user asked for
     * @apiParam  {string} projectID which needs to be retrived. (body params) (required)
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, project.
     *
     * @apiSuccessExample {object} Success-Response:
         {
           {
           message: "SUCCESS",
           project: {
             _id: projectID
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
        }
    */



postId: string,users:string[],dP:string

router.delete("/:id", checkAuth, ProjectController.deletePost);

/**
     * @apiGroup project
     * @apiVersion  1.0.0
     * @api {delete} /api/project/:id  used to delete the single project the user asked for
     * @apiParam  {string} projectID which needs to be retrived. (body params) (required)
     * @apiParam  {string[]} users who involved in the project. (query params) (required)
     * @apiParam  {string} dP deleted project name. (query params) (required)
     * @apiParam  {string} authorization authtoken (header- authorization )(required)
     * @apiSuccess {object} myResponse shows , message, http status code, project.
     *
     * @apiSuccessExample {object} Success-Response:
         {
           { message: "DELETION SUCCESSFULL!" }
         }

    */




module.exports = router;

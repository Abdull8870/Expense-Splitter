const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const projectRoutes = require("./routes/project");
const userRoutes = require("./routes/user");
const billRoutes = require("./routes/bill");
const expenseRoutes = require("./routes/expense");
const historyRoutes = require("./routes/history");

const app = express();


/**
 * database connection settings
 */

mongoose
  .connect(
    ""
  )
  .then(() => {
        console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* Allow CORS the functionality which allow request from all orgin AND
   also allows the methods like GET POST PATCH PULL AND DELETE
 */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

/*

Splitting the routes depending incoming request

*/

app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/history", historyRoutes);


module.exports = app;

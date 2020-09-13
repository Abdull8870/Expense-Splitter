const jwt = require("jsonwebtoken");

/* this middleware function will check the incoming request and
   verify whether the user is logged in check the  authtoken in header of
   the request if the auth token matched the user will be authorizated to
   perform the tasks
 */

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,"secret_this_should_be_longer");
    req.userData = { email: decodedToken.email, userId: decodedToken.userId,firstName:decodedToken.firstName,
    lastName:decodedToken.lastName };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};

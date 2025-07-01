const jwt = require("jsonwebtoken");

module.exports =  (req, res, next) => {
  // const token = req.header("Authorization");
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "No Authorization Header",
    });
  }
  try {
     jwt.verify(token, process.env.JWT_USER_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          msg: "Token Invalid",
        });
      } else {
        req.user = decoded.user;
        next();
      }
    });
    // console.log(token);
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: err.message,
    });
  }
};

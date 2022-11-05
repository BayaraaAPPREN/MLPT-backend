import jwt from "jsonwebtoken";

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "secret key", (err, data) => {
      if (err) res.status(403).json("token is not valid");
      //shine user gedeg property vvsgeed data g hadgal baigaa
      req.user = data;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
}
export default verify;

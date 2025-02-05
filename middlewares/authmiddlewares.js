const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireAuthUser = async (req, res, next) => {
  //partie 1 bil postman yehdikom
  const token = req.cookies.jwt_token;
  console.log(token);
  //Partie 2 bil frontEnd yhdikom
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.Net_Secret, async (err, decodedToken) => {
      if (err) {
        console.log("il ya une erreur au niveau du token", err.message);
        res.json("/Problem_token");
      } else {
        user = await userModel.findById(decodedToken.id);
        console.log(decodedToken.id);
        if (user) {
            req.session.user = user
          next();
        } else {
          res.json("/User_Not_found");
        }
      }
    });
  } else {
    res.json("Token_Not_Found");
  }
};

module.exports = requireAuthUser;

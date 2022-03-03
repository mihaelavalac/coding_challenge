const jwt = require("jsonwebtoken");

const secret = "this-cant-be-hacked";
const expiration = "2h";
const acceptedCredentials = {
  username: "test",
  password: "Test123!"
}

module.exports = {

  signToken: function (userCredentials) {
    if(userCredentials.username === acceptedCredentials.username && userCredentials.password === acceptedCredentials.password){
      const payload = { username: acceptedCredentials.username, password: acceptedCredentials.password };
      return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    } else {
      res.json({token: null, isAuth:false, message:'Unauthorized User. Please Try Again Later With Different Credentials!'})
    }
    
  },
  
  isAuth: async function (token) {
    if (!token) {
      res.json({isAuth:false, message:'Unauthorized User. Please Try Again Later With Different Credentials!'})
    }
    let response = await jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        throw new Error("Auth Error. Incorrect token" + err);
      }
      return decoded;
    });
    if(acceptedCredentials.username === response.data.username){
      return true //is Authenticated
      next()
    }
    return false;
}}

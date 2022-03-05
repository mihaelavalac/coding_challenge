const jwt = require("jsonwebtoken");

const secret = "this-cant-be-hacked";
const expiration = "2h";
const acceptedCredentials = {
  username: "welcome",
  password: "Mytest123!",
};

module.exports = {
  signToken: function (userCredentials) {
    if (
      userCredentials.username === acceptedCredentials.username &&
      userCredentials.password === acceptedCredentials.password
    ) {
      const payload = {
        username: acceptedCredentials.username,
        password: acceptedCredentials.password,
      };
      return { isAuth: true, token:jwt.sign({ data: payload }, secret, { expiresIn: expiration })}
    } else {
      return {
        token: null,
        isAuth: false,
        message:
          "Unauthorized User. Please Try Again With Different Credentials!",
      };
    }
  },
  isAuth: async function (raw_token) {
    let token = raw_token.split(" ")[1];
    if (!token) {
      return false;
    }
    let response = await jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return { isErr: true, message: "Auth Error. Incorrect token" + err };
      }
      return { isErr: false, decoded };
    });
    if (response.isErr) {
      return false;
    }
    if (acceptedCredentials.username === response.decoded.data.username) {
      return true; //is Authenticated
    }
    return false;
  },
};

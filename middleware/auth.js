//middleware have access to the request and response object

const jwt = require("jsonwebtoken");

const secret = "this-cant-be-hacked";
const expiration = "2h";
const acceptedCredentials = {
  username: "welcome",
  password: "Mytest123!",
};

module.exports = {
  // assign or generate token if the credential used by the user match the credentials in the system (acceptedCredentials).
  // is used when the user login first time.
  //returns the json web token and isAuth

  signToken: function (userCredentials) {
    if (
      userCredentials.username === acceptedCredentials.username &&
      userCredentials.password === acceptedCredentials.password
    ) {
      //payload refers to the data we add to the body of the a request
      const payload = {
        username: acceptedCredentials.username,
        password: acceptedCredentials.password,
      };
      //return an object with the token and isAuth property.
      return { isAuth: true, token: jwt.sign({ data: payload }, secret, { expiresIn: expiration })}
    } else {
      //else returns an message with error and the token = null, isAuth = false.
      return {
        token: null,
        isAuth: false,
        message:
          "Unauthorized User. Please Try Again With Different Credentials!",
      };
    }
  },

  //We assign this function to the isAuth property
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

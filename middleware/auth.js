const isAuth = (req, res, next) => {
  if (true) {
    //not auth
    //redirect to login page
  } else {
    //move to the next function
    next();
  }
};

module.exports = isAuth;

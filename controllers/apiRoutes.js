const router = require("express").Router();
const { signToken, isAuth } = require("../middleware/auth");

router.post("/quote", async (req, res) => {
  if (isAuth) {
    data = {
      age: req.body.age,
      currency: req.body.currencyOption,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
  }
  res.json(data);
  //get data from request, check if is logged in and return back calculation. If not logged in redirect to a diff page
});

router.post("/login", async (req, res) => {
  userCredentials = {
    username: req.body.username,
    password: req.body.password,
  };
  res.json({ token: signToken(userCredentials) });
});



// router.post('/logout', async (req, res) => {

// });

module.exports = router;

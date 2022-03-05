const router = require("express").Router();
const { signToken, isAuth } = require("../middleware/auth");

router.post("/quote", async (req, res) => {
  if (await isAuth(req.headers.authorization)) {
    const age = req.body.age;
    const currency = req.body.currency;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    res.json({
      isAuth: true,
      message: "Great job here is your result:",
      result: { age, currency, startDate, endDate },
    });
  } else {
    res.json({
      isAuth: false,
      message: "Auth Error. Please sign in to obtain this information!",
    });
  }
});

router.post("/login", async (req, res) => {
  userCredentials = {
    username: req.body.username,
    password: req.body.password,
  };
  res.setHeader("Content-Type", "application/json");
  res.json({ token: signToken(userCredentials) });
});


// router.post('/logout', async (req, res) => {

// });

module.exports = router;

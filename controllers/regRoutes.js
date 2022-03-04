const { isAuth } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", async (req, res) => {
  //login page
  res.render("login");
});

router.get("/quote", async (req, res) => {
  //form page, check if logged based on token, if not redirect to login page
  
  res.render("quote");
});

router.post("/quote", async (req, res) => {
  if (isAuth) {
    data = {
      age: req.body.age,
      currency: req.body.currencyOption,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    res.json({ data });
  } else {
    document.location.replace('login');
  }

  //get data from request, check if is logged in and return back calculation. If not logged in redirect to a diff page
});

module.exports = router;

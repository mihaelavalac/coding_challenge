const router = require("express").Router();

router.get("/", async (req, res) => {
  //login page
  res.render("login");  
});

router.get("/quote", async (req, res) => {
  // quote page
  res.render("quote");
});

module.exports = router;

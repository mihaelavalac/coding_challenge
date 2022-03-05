const router = require("express").Router();
const { signToken, isAuth } = require("../middleware/auth");
var shortid = require('shortid');

router.post("/quote", async (req, res) => {
  if (await isAuth(req.headers.authorization)) {
    const quote_id = shortid.generate();
    const age = req.body.age;
    const currency = req.body.currency;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const tripLength = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1; 
    const age_array = age.split(',');
    var total_quote = 0;
    age_array.forEach(person_age => {
      total_quote = total_quote + getOnePersonQuote(getLoad(parseInt(person_age)), tripLength);
    });
    res.json({
      isAuth: true,
      message: "Thanks for accessing the portal! This is the quote:",
      result: total_quote.toFixed(2),
      currency,
      quote_id
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

function getLoad(age){
  if(age >= 18 && age <= 30){
    return 0.6
  } else if ( age >= 31 && age <= 40){
    return 0.7
  } else if ( age >= 41 && age <= 50){
    return 0.8
  } else if ( age >= 51 && age <= 60){
    return 0.9
  } else if ( age >= 61 && age <= 70){
    return 1
  }
}


function getOnePersonQuote(ageLoad, tripLength){
  const FIXED_RATE = 3;
  return FIXED_RATE * ageLoad * tripLength
}

module.exports = router;

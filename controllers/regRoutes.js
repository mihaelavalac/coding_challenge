const router = require('express').Router();
const isAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  //login page
  res.render('login');
})

router.get('/home', async(req,res) =>{
  //form page, check if logged based on token, if not redirect to login page
  res.render('homepage');
})


module.exports = router;

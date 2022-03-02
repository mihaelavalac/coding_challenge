const router = require('express').Router();
const apiRoutes = require('./apiRoutes.js');
const regRoutes = require('./regRoutes.js');

router.use('/', regRoutes);
router.use('/api', apiRoutes);

module.exports = router;

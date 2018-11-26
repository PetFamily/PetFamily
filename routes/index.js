const express = require('express');
const router = express.Router();
const profile = require("../routes/profile");
const main = require("../routes/main");


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/profile', profile);
router.use('/main', main);


module.exports = router;

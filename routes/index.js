const express = require('express');
const router = express.Router();
const profile = require("./profile");
const main = require("../routes/main");


const ensureLogin = require("connect-ensure-login")
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/profile', ensureLogin.ensureLoggedIn(), profile);
router.use('/main', ensureLogin.ensureLoggedIn(), main);


module.exports = router;

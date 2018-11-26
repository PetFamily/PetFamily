const express = require('express');
const profileRouter = express.Router();

profileRouter.get('/', (req, res, next) => {
  res.render('profile');
});


module.exports = profileRouter;
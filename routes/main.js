const express = require('express');
const mainRouter = express.Router();

mainRouter.get('/', (req, res, next) => {
  res.render('main');
});
mainRouter.get('/new', (req, res, next) => {
  res.render('userLocation');
});

mainRouter.post('/new', (req, res, next) => {


  res.redirect('/main');
});


module.exports = mainRouter;
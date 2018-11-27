const express = require('express');
const mainRouter = express.Router();
const User = require("../models/User")

mainRouter.get('/', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('main');
    })
});
mainRouter.get('/new', (req, res, next) => {
  res.render('userLocation');
});

mainRouter.post('/new', (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.params._id },
    { $set: { address } })
  res.redirect('/main');
});

mainRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    res.render('user-profile', { user });

  })
});


module.exports = mainRouter;
const express = require('express');
const mainRouter = express.Router();
const User = require("../models/User")
const checkComplete = require('../middleware/checkComplete');



mainRouter.get('/', checkComplete(),(req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('main');
    })
});
mainRouter.get('/new',(req, res, next) => {
  res.render('userLocation');
});

mainRouter.post('/new', (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        address: {
          lat: req.body.lat,
          lng: req.body.lng
        },
        userLocationName: req.body.userLocationName
      }
    }, { new: true })
    .then(user => {
      console.log(user);
      res.redirect('/main');
    })
});

mainRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    res.render('user-profile', { user });

  })
});


module.exports = mainRouter;
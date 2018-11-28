const express = require('express');
const profileRouter = express.Router();
const User = require("../models/User");


profileRouter.get('/', (req, res, next) => {
  res.render('profile');
});

profileRouter.post('/', (req, res, next) => {
  const { availability, pricePerHour, centerDescription, typeActivity } = req.body;
  const userPhoto = req.file.originalname;
  const userPath = req.file.url;

  User.findByIdAndUpdate({ _id: req.user._id }, { $set: { availability, pricePerHour, centerDescription, typeActivity, userPhoto, userPath } }, { new: true })

    .then((user) => {
      console.log("User added properly")
      res.redirect('/main');
    })
    .catch(error => {
      console.log("User NOT ADDED");
    })
});

profileRouter.get('/user', (req, res, next) => {
  // User.findById(req.user._id)
  //   .then((user) => {
  res.render('user-profile');
  // })
});



module.exports = profileRouter;
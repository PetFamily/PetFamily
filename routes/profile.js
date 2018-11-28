const express = require('express');
const profileRouter = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");

profileRouter.get('/', (req, res, next) => {
  res.render('profile');
});

profileRouter.post('/', uploadCloud.single("userPhoto"), (req, res, next) => {

  const { availability, pricePerHour, centerDescription, typeActivity } = req.body;
  const userPath = req.file.url;
  const userPhoto = req.file.originalname;

  User.findByIdAndUpdate({ _id: req.user._id }, { $set: { availability, pricePerHour, centerDescription, typeActivity, userPath, userPhoto } }, { new: true })

    .then((user) => {
      console.log(req.file);
      console.log("jp")
      res.redirect('/main');
    })
    .catch(error => {
      console.log("User NOT ADDED");
    })
});

profileRouter.get('/user', (req, res, next) => {
  res.render('user-profile');
});



module.exports = profileRouter;
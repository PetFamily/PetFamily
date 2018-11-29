const express = require('express');
const profileRouter = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");

profileRouter.get('/', (req, res, next) => {
  res.render('profile');
});

profileRouter.post('/', uploadCloud.single("userPhoto"), (req, res, next) => {
  const update = { availability, pricePerHour, centerDescription, typeActivity } = req.body
  if (req.file) {
    update.userPath = req.file.url;
    update.userPhoto = req.file.originalname
  }
  for (key in update) {
    if (update[key] == '') {
      delete update[key]
    }
  }
  User.findByIdAndUpdate({ _id: req.user._id },
    update, {
      new: true
    })
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
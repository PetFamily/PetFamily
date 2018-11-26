const express = require('express');
const profileRouter = express.Router();
const User = require("../models/User");

profileRouter.get('/', (req, res, next) => {
  res.render('profile');
});

profileRouter.post('/', (req, res, next) => {
const {availability, pricePerHour, description, typeActivity} = req.body;

const newProfile = new User({availability, pricePerHour, description, typeActivity})
User.findByIdAndUpdate({_id: req.user._id}, {$set: {availability, pricePerHour, description, typeActivity}})

.then((user)=>{
console.log("User added properly")
res.redirect('main');
})
.catch(error =>{
  console.log("User NOT ADDED");
  })
});

profileRouter.get('/:id', (req, res, next) => {
  User.findById(req.params.id).then((user)=>{
    res.render('user-profile',{user});
  })

});




module.exports = profileRouter;
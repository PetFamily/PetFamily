const express = require("express");
const mainRouter = express.Router();
const User = require("../models/User");
const Pets = require("../models/Pet");
const checkComplete = require("../middleware/checkComplete");
const uploadCloud = require("../config/cloudinary");

mainRouter.get("/", checkComplete(), (req, res, next) => {
  console.log(req.user.centerDescription);
  User.findOneAndUpdate(
    { username: req.user.username },
    {
      $set: {
        availability: req.user.availability,
        pricePerHour: req.user.pricePerHour,
        centerDescription: req.user.centerDescription,
        typeActivity: req.user.typeActivity
      }
    },
    {
      new: true
    }
  )
    .then(user => {
      // JSON.stringify()
      var newvar = JSON.stringify({ address: user.address })
      res.render("main", { pepe: newvar });
    })
    .catch(err => console.log(err));
});
mainRouter.get("/new", (req, res, next) => {
  res.render("userLocation");
});

mainRouter.post("/new", (req, res, next) => {
  console.log(req.body);
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
    },
    { new: true }
  ).then(user => {
    console.log(user);
    res.redirect("/main");
  });
});

mainRouter.get("/pets", (req, res, next) => {
  res.render("petForm");
});

mainRouter.post("/pets", uploadCloud.single("petPhoto"), (req, res, next) => {
  const {
    name,
    description,
    age,
    notes,
    type,
    vaccunationCompleted
  } = req.body;
  console.log(req.body, req.file);
  const petPhoto = req.file.originalname;
  const petPath = req.file.url;
  const newPet = new Pets({
    name,
    description,
    age,
    notes,
    type,
    vaccunationCompleted,
    petPhoto,
    petPath
  });
  newPet.save()
    .then((pet) => {
      User.findByIdAndUpdate({
        _id: req.user._id
      }, {
          $push: {
            pets: {
              pet: pet._id
            }
          }
        },
        {
          new: true
        })
      res.redirect("/main");
    })
    .catch(err => {
      console.log(err);
    });
});

mainRouter.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render("user-profile", { user });
  });
});

module.exports = mainRouter;

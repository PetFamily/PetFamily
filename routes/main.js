const express = require("express");
const mainRouter = express.Router();
const User = require("../models/User");
const Pets = require("../models/Pet");
const checkComplete = require("../middleware/checkComplete");
const uploadCloud = require("../config/cloudinary");

mainRouter.get("/", checkComplete(), (req, res, next) => {
  User.find()
    .then(users => {
      const address = users.map(({ address, userLocationName, username, email, userType, availability, pricePerHour, typeActivity, _id }) => {

        return { address, userLocationName, username, email, userType, availability, pricePerHour, typeActivity, _id }
      });
      var JSONaddress = JSON.stringify({ address });

      res.render("main", { address: JSONaddress });
      console.log(JSONaddress);
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
    .then(pet => {
      User.findByIdAndUpdate(
        {
          _id: req.user._id
        },
        {
          $push: {
            pets: pet._id
          }
        },
        {
          new: true
        }
      )
        .then(() => {
          res.redirect("/main");
        })
    })
    .catch(err => {
      console.log(err);
    });
});
mainRouter.get("/pets/:id/edit", (req, res) => {
  Pets.findByIdAndUpdate(req.params.id)
    .then(pet => {
      res.render("edit-pet", { pet });
    })
})

mainRouter.post("/pets/:id/edit", uploadCloud.single("petPhoto"), (req, res, next) => {
  const update = { name, description, age, notes, type, vaccunationCompleted } = req.body
  if (req.file) {
    update.petPath = req.file.url;
    update.petPhoto = req.file.originalname
  }
  for (key in update) {
    if (update[key] == '') {
      delete update[key]
    }
  }
  Pets.findByIdAndUpdate({ _id: req.params.id },
    update
    , { new: true })
    .then(() => {
      res.redirect("/main")
    })
    .catch(err => console.log(err))
})
mainRouter.get('/pets/:id/delete', (req, res, next) => {
  Pets.findByIdAndRemove(req.params.id)
    .then(() => res.redirect(`/main/${req.user._id}`))
    .catch(err => next(err));
});
mainRouter.get('/myprofile', (req, res) => {
  console.log(req.user);

  res.render('user-profile', { user: req.user })
})
mainRouter.get("/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      res.render("client-profile", { user });
    });
});



module.exports = mainRouter;
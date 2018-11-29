const express = require("express");
const mainRouter = express.Router();
const User = require("../models/User");
const Pets = require("../models/Pet");
const checkComplete = require("../middleware/checkComplete");
const uploadCloud = require("../config/cloudinary");

mainRouter.get("/", checkComplete(), (req, res, next) => {
   User.find()
    .then(users => {
      const address = users.map(({address, userLocationName, username, email}) => {
     
         return {address, userLocationName, username, email}
      });
      var JSONaddress = JSON.stringify({ address });
      
      res.render("main", { address:JSONaddress });
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
          $set: {
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
mainRouter.get("/pets/edit", (req, res) => {
  res.render("edit-pet");
})

mainRouter.post("/pets/edit", uploadCloud.single("petPhoto"), (req, res, next) => {
  // console.log(req.file)
  Pets.findByIdAndUpdate({ _id: req.params._id }, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      notes: req.body.notes,
      type: req.body.type,
      vaccunationCompleted: req.body.vaccunationCompleted,
      petPhoto: req.file.originalname, //me dice que Cannot read property 'originalname' of undefined
      petPath: req.file.url
    }

  }, { new: true })
    .then(() => {
      res.redirect("/main")
    })
    .catch(err => console.log(err))
})
mainRouter.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
  .populate('pets')
  .then(user => {
    res.render("user-profile", { user });
  });
});

module.exports = mainRouter;
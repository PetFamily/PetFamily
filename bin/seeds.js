// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Pet = require("../models/Pet");

const bcryptSalt = 10;
let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    email: "alice@gmail.com",
    userType: "Individual",
    availability: "9am a 15pm",
    pricePerHour: "15€",
    typeActivity: "Finder",
    centerDescription: "Grandes espacios para jugar"
  }
]

let pet = [{
  name: "Turron",
  type: "Cat",
  description: "gato marron",
  vaccunationCompleted: true,
  age: "3week",
  notes: "alergico a los lunes",
}]

mongoose
  .connect('mongodb://localhost/petfamily', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    return User.collection.drop();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(() => {
    return Pet.create(pet)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
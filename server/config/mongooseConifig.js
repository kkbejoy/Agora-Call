const mongoose = require("mongoose");
const User = require("../models/UserModel");
const DbName = "AgooraCalling";

const url = process.env.mongo_URI;

mongoose.connect(url, {
  DbName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongoConnect = mongoose.connection;

mongoConnect.on("error", console.error.bind(console, "Connection error:"));
// const Sachin = {
//   userName: "Sachin",
//   email: "sachin@gmail.com",
//   password: "123",
// };
// User.create(Sachin)
//   .then((res) => console.log("saved", res))
//   .catch((error) => {
//     console.log(error);
//   });
mongoConnect.once("open", function () {
  console.log("Connected to Mongo DB");
});

module.exports = mongoConnect;

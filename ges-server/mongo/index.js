const mongoose = require("mongoose");

// BUILD THE MONGO URL CONNECTION STRING

const { username, password, projectname } = require("../config.json");
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.j5wvs.mongodb.net/${projectname}?retryWrites=true&w=majority`;

// CONNECT TO DIFF MONGO
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Succesfuly connection to Mongo DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};

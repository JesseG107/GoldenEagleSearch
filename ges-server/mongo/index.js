const mongoose = require("mongoose");

// BUILD THE MONGO URL CONNECTION STRING

const { username, password, projectname } = require("../config.json");
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.j5wvs.mongodb.net/${projectname}?retryWrites=true&w=majority`;

// CONNECT TO MONGO
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:coffee100!@cluster0.33f1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`Connected to Mongo DB`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectDB,
};

const testConnection = async () => {
  try {
    const mongoose = require("mongoose");

    // Get a list of collections in the database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in the database:", collections);

    // Optional: Create a test collection and document
    const TestModel = mongoose.model("Test", new mongoose.Schema({ name: String }));
    const testDocument = await TestModel.create({ name: "Test Document" });
    console.log("Test document created:", testDocument);

    // Clean up the test document
    await TestModel.deleteOne({ _id: testDocument._id });
    console.log("Test document deleted");
  } catch (error) {
    console.error("Test connection error:", error);
  }
};

// Initialize the database connection and test it
(async () => {
  await connectDB();
  await testConnection();
})();
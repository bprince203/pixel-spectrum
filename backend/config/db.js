const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectToMongo = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING)
      .then(() => {
        console.log("Connected to the database");
        resolve(); // Resolve the promise on successful connection
      })
      .catch((e) => {
        console.error(e.message);
        reject(e); // Reject the promise on connection error
      });
  });
};

module.exports = connectToMongo;

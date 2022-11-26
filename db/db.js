const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("Base de datos conectada");
  } catch {
    console.log("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {dbConnection}
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connectMongooseToDB(req, res, next) {
  const dbString = process.env.PROD_DB_URL || process.env.DEV_DB_URL;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(dbString, dbOptions);
  next();
}

export default connectMongooseToDB;

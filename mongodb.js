import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default function connectMongooseToDB(req, res, next) {
  const mongoDB = process.env.PROD_DB_URL || process.env.DEV_DB_URL;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  next();
}

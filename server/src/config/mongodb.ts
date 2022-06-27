import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_DEV || 'mongodb://localhost:27017/lightning_db');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));

db.once("open", () => {
  console.log("Mongodb connected successfully");
});

export default db;
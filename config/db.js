const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
const db = 'mongodb://mongodb-0.mongo-service:27017,mongodb-1.mongo-service:27017,mongodb-2.mongo-service:27017/dev-connector?replicatSet=rs0';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
}

module.exports = connectDB;
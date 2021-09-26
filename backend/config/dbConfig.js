require('dotenv').config();
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

// const DB_HOST = 'localhost'
// const DB_NAME = 'interview'
// const DB_PORT = 27017

// const dbConnectionURL = 'mongodb+srv://admin:admin@cluster0.or3fk.mongodb.net/interview?retryWrites=true&w=majority'
// const dbConnectionURL = 'mongodb://localhost:27017/interview'
const dbConnectionURL = process.env.mongoUrl;
const serverURL = 'http://localhost:3001';

module.exports = {
  dbConnectionURL,
  options,
  serverURL,
};

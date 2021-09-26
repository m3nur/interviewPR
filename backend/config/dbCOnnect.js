const mongoose = require('mongoose')
const { dbConnectionURL, options } = require('./dbConfig')

function dbConnect() {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if(err) return console.log(err)
    console.log('Success connected to mongo')
  })
}

module.exports = dbConnect

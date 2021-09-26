const { Router } = require('express')
const parsingDataFromInput = require('../controllers/wordController')

const wordRouter = Router()

wordRouter
  .route('/')
  .post(parsingDataFromInput)

module.exports = wordRouter

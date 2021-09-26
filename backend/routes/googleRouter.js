const { Router } = require('express')
const googleRegistration = require('../controllers/googleController')

const googleRouter = Router()

googleRouter
  .route('/')
  .post(googleRegistration);

module.exports = googleRouter

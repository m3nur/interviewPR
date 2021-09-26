const { Router } = require('express')
const { deleteReview, changeLikeReview, editReview, addNewReview, getAllReviewPopulated } = require('../controllers/reviewController')


const reviewRouter = Router()

reviewRouter
  .route('/')
  .get(getAllReviewPopulated);
reviewRouter
  .route('/')
  .post(addNewReview);
reviewRouter
  .route('/:id')
  .delete(deleteReview);
reviewRouter
  .route('/:id')
  .post(changeLikeReview);
reviewRouter
  .route('/edit/:id')
  .patch(editReview);

module.exports = reviewRouter


import {
  CLEAR_ALL,
  GET_ALL,
  PROGINATION_REVIEWS,
  SORT_REVIEWS,
} from '../types/types';
import { CHANGE_LIKE_REVIEW, DELETE_ONE } from '../types/typeReview';
import axios from 'axios';

export const setAll = (reviews) => {
  return {
    type: GET_ALL,
    payload: reviews,
  };
};

export const clear = () => {
  return {
    type: CLEAR_ALL,
  };
};

export const deleteReview = (id) => {
  return {
    type: DELETE_ONE,
    payload: id,
  };
};

export const sortReviews = (reviews) => {
  return {
    type: SORT_REVIEWS,
    payload: reviews,
  };
};

export const pogination = (litleReview) => {
  return {
    type: PROGINATION_REVIEWS,
    payload: litleReview,
  };
};

export const changeLikeReviews = (oneReview) => {
  return {
    type: CHANGE_LIKE_REVIEW,
    payload: oneReview,
  };
};

export const getAllFetch = () => async (dispatch) => {
  const result = await axios('/api/review');

  dispatch(setAll(result.data));
};

export const getCurrentReviews = (id) => async (dispatch) => {
  const result = await axios('/api/review');

  dispatch(setAll(result.data));
};

export const getLitle = (index) => async (dispatch) => {
  const result = await axios('/api/review');

  const litle = result.data.slice(index, index + 6);

  dispatch(pogination(litle));
};
export const changeLikeFetch = (id, userId) => async (dispatch) => {
  const result = await axios.post(`/api/review/${id}`, {
    userId,
  });
  dispatch(changeLikeReviews(result.data));
};

export const deletePostFetch = (id) => async (dispatch) => {
  const result = await axios.delete(`/api/review/${id}`, {});
  console.log(result.data);
  dispatch(deleteReview(id));
};

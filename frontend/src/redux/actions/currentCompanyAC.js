import axios from 'axios';
import { GET_CURRENT_COMPANY, SET_CURRENT_COMPANY } from '../types/types';

export const getCurrentCompany = (id) => {
  return {
    type: GET_CURRENT_COMPANY,
    payload: id,
  };
};

export const currentFetch = (id) => async (dispatch) => {
  const result = await fetch(`/api/company/${id}`);

  const currentSearchromServer = await result.json();

  dispatch(getCurrentCompany(currentSearchromServer));
};

export const setCurrentCompany = (id) => {
  return {
    type: SET_CURRENT_COMPANY,
    payload: id,
  };
};

export const setCompanyFetch = (id, userId) => async (dispatch) => {
  const result = await axios.patch(`/api/company/edit/${id}`, {
    userId,
  });

  dispatch(setCurrentCompany(result.data));
};

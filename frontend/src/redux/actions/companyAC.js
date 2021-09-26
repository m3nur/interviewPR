import { GET_ALL_FROM_SERVER, GET_ALL_COMPANYS } from '../types/types';

export const setAll = (companys) => {
  return {
    type: GET_ALL_COMPANYS,
    payload: companys,
  };
};

export const all = (companies) => {
  return {
    type: GET_ALL_FROM_SERVER,
    payload: companies,
  };
};

export const allFetch = () => async (dispatch) => {
  const com = await fetch('/api/company');
  const allCompanies = await com.json();

  dispatch(all(allCompanies));
};

export const getAllFetch = (text) => async (dispatch) => {
  const myText = text.toLowerCase();
  const result = await fetch('/api/company', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const allFSearchromServer = await result.json();

  dispatch(setAll(allFSearchromServer));
};

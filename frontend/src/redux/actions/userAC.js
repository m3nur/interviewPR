import {
  AUTH,
  EDIT_PROFILE,
  GET_USER,
  LOG_OUT,
  SAGA_LOGIN,
  SAGA_REGISTER,
  SET_USER,
} from '../types/types';

export const sagaRegisterAC = ({ email, password, name, surname }) => {
  return {
    type: SAGA_REGISTER,
    payload: {
      name,
      surname,
      email,
      password,
    },
  };
};

export const registerAC = (user) => {
  return {
    type: AUTH,
    payload: {
      ...user,
      isAuth: true,
    },
  };
};

export const sagaLoginAC = (user) => {
  return {
    type: SAGA_LOGIN,
    payload: {
      ...user,
    },
  };
};

export const loginAC = (user) => {
  console.log(user);
  return {
    type: AUTH,
    payload: {
      ...user,
      isAuth: true,
    },
  };
};

export const logoutAC = () => async (dispatch) => {
  await fetch('/api/user/logout', {
    credentials: 'include',
  });
  dispatch(logout());
};

export const logout = () => {
  return {
    type: LOG_OUT,
    payload: {
      isAuth: false,
    },
  };
};

export const changeAvatar = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
export const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

export const editProfileUser = (user) => {
  return {
    type: EDIT_PROFILE,
    payload: user,
  };
};

export const editProfileFetch =
  (id, name, surname, email, telegram, showContact) => async (dispatch) => {
    const editProfile = await fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, surname, telegram, email, showContact }),
    });
    const edit = await editProfile.json();
    dispatch(editProfileUser(edit));
  };

export const changeAvatarFetch = (file, id) => async (dispatch) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', id);

  const response = await fetch('/api/user/changeAvatar', {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  const newUser = await response.json();
  dispatch(changeAvatar(newUser));
};

export const getUserFetch = (id) => async (dispatch) => {
  const newUser = await fetch('/api/user', {
    method: 'GET',
    credentials: 'include',
  });

  dispatch(getUser(newUser.data));
};

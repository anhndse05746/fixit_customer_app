import {createSlice} from '@reduxjs/toolkit';

import {apiCallBegan} from './apiActions';
import constants from '../utils/constants';

const user = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    phoneNumber: '',
    name: '',
    roleId: '',
    email: '',
    loading: false,
    token: '',
    message: '',
    updateUserMessage: '',
    addressList: [],
  },
  reducers: {
    usersRequested: (users, action) => {
      console.log(action);
      users.message = '';
      users.updateUserMessage = '';
      users.loading = true;
    },
    usersLoggedIn: (users, action) => {
      console.log(action);
      users.userId = action.payload.id;
      users.phoneNumber = action.payload.phone;
      users.name = action.payload.name;
      users.roleId = action.payload.roleId;
      users.email = action.payload.email;
      users.token = action.payload.token;
      users.addressList = action.payload.address_list;
      users.message = LOGGED_IN;
      users.loading = false;
    },
    usersLoginFailed: (users, action) => {
      console.log(action);
      users.message = constants.LOGIN_FAIL_MESSAGE;
      users.loading = false;
      return;
    },
    usersUpdated: (users, action) => {
      console.log(action);
      users.name = action.payload.name;
      users.email = action.payload.email;
      users.updateUserMessage = constants.UPDATE_SUCCESSFULLY;
      users.loading = false;
    },
    usersUpdateFailed: (users, action) => {
      console.log(action);
      users.message = '';
      users.loading = false;
      return;
    },
    userChangePasswordSuccess: (users, action) => {
      console.log(action);
      if (action.payload == 'success') {
        users.message = constants.RESET_PASSWORD_SUCCESSFULLY;
      } else if (action.payload == 'Incorrect password') {
        users.message = constants.OLD_PASSWORD_IS_NOT_CORRECT;
      }
    },
    userChangePasswordFail: (users, action) => {
      console.log(action);
    },
    userCreateAddress: (users, action) => {
      console.log(action);
      if (action.payload !== 'New address is duplicated') {
        users.addressList.push(action.payload);
        users.message = constants.CREATE_ADDRESS_SUCCESSFULLY;
      } else users.message = constants.DUPLICATE_ADDRESS;
    },
    userCreateAddressFailed: (users, action) => {
      console.log(action);
    },
    clearMessage: (users, action) => {
      console.log(action);
      users.message = '';
      users.updateUserMessage = '';
    },
  },
});

export const LOGGED_IN = 'logged in';

export default user.reducer;
export const {
  usersRequested,
  usersLoggedIn,
  usersLoginFailed,
  userChangePasswordFail,
  userChangePasswordSuccess,
  usersUpdateFailed,
  usersUpdated,
  userUpdateDeviceToken,
  userCreateAddress,
  userCreateAddressFailed,
  clearMessage,
} = user.actions;

export const loadUsers = (username, password, device_token) =>
  apiCallBegan({
    url: '/login',
    data: {
      phone_number: username,
      password: password,
      role_id: constants.ROLE_CUSTOMER,
      device_token: device_token,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: usersLoggedIn.type,
    onError: usersLoginFailed.type,
  });

export const changePassword = (phone, token, old_password, new_password) =>
  apiCallBegan({
    url: '/api/changePassword',
    headers: {
      Authorization: token,
    },
    data: {
      phone_number: phone,
      old_password: old_password,
      new_password: new_password,
      role_id: constants.ROLE_CUSTOMER,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: userChangePasswordSuccess.type,
    onError: userChangePasswordFail.type,
  });

export const updateUser = (phone, token, name, email) =>
  apiCallBegan({
    url: '/api/updateUser',
    headers: {
      Authorization: token,
    },
    data: {
      phone_number: phone,
      role_id: constants.ROLE_CUSTOMER,
      name: name,
      email: email,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: usersUpdated.type,
    onError: usersUpdateFailed.type,
  });

export const createAddress = (id, token, city, district, address) =>
  apiCallBegan({
    url: '/api/createAddress',
    headers: {
      Authorization: token,
    },
    data: {
      user_id: id,
      address: address,
      district: district,
      city: city,
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: userCreateAddress.type,
    onError: userCreateAddressFailed.type,
  });

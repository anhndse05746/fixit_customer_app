import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './apiActions';
import constants from '../utils/constants';

const noti = createSlice({
  name: 'notification',
  initialState: {
    notificationList: [],
    loading: false,
    mesage: '',
  },
  reducers: {
    onStart: (noti, action) => {
      console.log(action);
      noti.loading = true;
      noti.mesage = '';
    },
    getNotiListSuccess: (noti, action) => {
      console.log(action);
      if (noti.notificationList.length == 0) {
        noti.notificationList = action.payload;
      } else {
        noti.notificationList = noti.notificationList.concat(action.payload);
      }
      noti.loading = false;
    },
    getNotiListFail: (noti, action) => {
      console.log(action);
      noti.loading = false;
    },
  },
});

export default noti.reducer;

export const { onStart, getNotiListSuccess, getNotiListFail } = noti.actions;

export const getNotificationList = (token, user_id, page) =>
  apiCallBegan({
    url: '/api/getNotification',
    headers: {
      Authorization: token,
    },
    data: {
      user_id: user_id,
      page: page,
    },
    method: 'POST',
    onStart: onStart.type,
    onSuccess: getNotiListSuccess.type,
    onError: getNotiListFail.type,
  });

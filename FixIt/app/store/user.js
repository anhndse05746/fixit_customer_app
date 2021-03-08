import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'
import constants from '../utils/constants'

const user = createSlice({
    name: 'user',
    initialState: {
        phoneNumber: '',
        name: '',
        roleId: '',
        loading: false,
        message: ''
    },
    reducers: {
        usersRequested: (users, action) => {
            users.message = ''
            users.loading = true
        },
        usersLoggedIn: (users, action) => {
            console.log(action)
            users.phoneNumber = action.payload.phone
            users.name = action.payload.name
            users.roleId = action.payload.roleId
            users.message = LOGGED_IN
            users.loading = false
        },
        usersLoginFailed: (users, action) => {
            console.log(action)
            users.message = "Sai tên tài khoản hoặc mật khẩu"
            users.loading = false
            return;
        },
        usersUpdated: (users, action) => {
            console.log(action)
            users.loading = false
        },
        usersUpdateFailed: (users, action) => {
            console.log(action)
            users.message = ""
            users.loading = false
            return;
        },
    }
})

export const LOGGED_IN = 'logged in'

export default user.reducer
export const { usersRequested, usersLoggedIn, usersLoginFailed } = user.actions

export const loadUsers = (username, password) => apiCallBegan({
    url: '/login',
    data: {
        phoneNumber: username,
        password: password,
        role_id: constants.ROLE_CUSTOMER
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: usersLoggedIn.type,
    onError: usersLoginFailed.type
})

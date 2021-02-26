import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'

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
        usersReceived: (users, action) => {
            console.log(action)
            users.phoneNumber = action.payload.phone
            users.name = action.payload.name
            users.roleId = action.payload.roleId
            users.message = LOGGED_IN
            users.loading = false
        },
        usersRequestedFailed: (users, action) => {
            console.log(action)
            users.message = "Phone number or password are incorrect"
            users.loading = false
            return;
        }
    }
})

export const LOGGED_IN = 'logged in'

export default user.reducer
export const { usersRequested, usersReceived, usersRequestedFailed } = user.actions

export const loadUsers = (username, password) => apiCallBegan({
    url: '/login',
    data: {
        phoneNumber: username,
        password: password
    },
    method: 'POST',
    onStart: usersRequested.type,
    onSuccess: usersReceived.type,
    onError: usersRequestedFailed.type
})

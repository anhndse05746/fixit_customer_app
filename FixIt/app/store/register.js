import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'
import constants from '../utils/constants'

const register = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        message: ''
    },
    reducers: {
        registerRequested: (users, action) => {
            users.message = ''
            users.loading = true
        },
        registered: (users, action) => {
            console.log(action)
            users.loading = false
        },
        registerFailed: (users, action) => {
            console.log(action)
            users.message = ""
            users.loading = false
            return;
        },
        checkRegistered: (users, action) => {
            console.log(action)
            users.loading = false
        },
        checkRegisteredFailed: (users, action) => {
            console.log(action)
            users.message = ""
            users.loading = false
            return;
        },
    }
})

export default register.reducer
export const { registerRequested, registered, registerFailed, checkRegistered, checkRegisteredFailed } = register.actions

export const registerUser = (phoneNumber, password, name, email) => apiCallBegan({
    url: '/register',
    data: {
        phone_number: phoneNumber,
        password: password,
        name: name,
        role_id: constants.ROLE_CUSTOMER,
        email: email
    },
    method: 'POST',
    onStart: registerRequested.type,
    onSuccess: registered.type,
    onError: registerFailed.type
})

export const registeredUser = (phoneNumber) => apiCallBegan({
    url: '/register',
    data: {
        phone_number: phoneNumber,
        role_id: constants.ROLE_CUSTOMER
    },
    method: 'POST',
    onStart: registerRequested.type,
    onSuccess: checkRegistered.type,
    onError: checkRegisteredFailed.type
})
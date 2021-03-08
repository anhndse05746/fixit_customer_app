import { createSlice } from '@reduxjs/toolkit'

import { apiCallBegan } from './apiActions'
import constants from '../utils/constants'

const register = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        isRegistered: true,
        message: '',
        OTPMessage: ''
    },
    reducers: {
        registerRequested: (register, action) => {
            register.message = ''
            register.isRegistered = true
            register.loading = true
        },
        registeredSuccessful: (register, action) => {
            console.log(action)
            register.loading = false
        },
        registerFailed: (register, action) => {
            console.log(action)
            register.message = ""
            register.loading = false
            return;
        },
        checkRegistered: (register, action) => {
            console.log(action)
            if (action.payload === "Phone number is registed") {
                register.isRegistered = true
                register.message = "Số điện thoại đã được sử dụng"
            }
            else {
                register.isRegistered = false
            }
            register.loading = false
        },
        checkRegisteredFail: (register, action) => {
            console.log(action)
            register.loading = false
            return;
        },
    }
})

export default register.reducer
export const { registerRequested, registeredSuccessful, registerFailed, checkRegistered, checkRegisteredFail } = register.actions

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
    onSuccess: registeredSuccessful.type,
    onError: registerFailed.type
})

export const checkRegisteredUser = (phoneNumber) => apiCallBegan({
    url: '/checkRegistered',
    data: {
        phone_number: phoneNumber,
        role_id: constants.ROLE_CUSTOMER
    },
    method: 'POST',
    onStart: registerRequested.type,
    onSuccess: checkRegistered.type,
    onError: checkRegisteredFail.type
})
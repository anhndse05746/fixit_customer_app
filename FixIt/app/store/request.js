import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './apiActions';
import constants from '../utils/constants';

const request = createSlice({
    name: 'request',
    initialState: {
        message: '',
        isLoading: false,
        onGoingRequests: [],
        executingRequest: [],
        completeRequest: [],
        canceledRequest: []
    },
    reducers: {
        onRequestStarted: (request, action) => {
            console.log(action)
            request.message = ''
            request.isLoading = true
        },
        createRequestSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
            if (action.payload.id !== undefined) {
                request.message = 'Tạo yêu cầu thành công'
            }
        },
        createRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        clearMessage: (request, action) => {
            console.log(action)
            request.message = ''
        },
    }
})

export default request.reducer
export const { onRequestStarted, createRequestSuccess, createRequestFail, clearMessage } = request.actions

export const createRequest = (token, request) => apiCallBegan({
    url: '/api/createRequest',
    headers: {
        Authorization: token,
    },
    data: {
        customer_id: request.customer_id,
        service_id: request.service_id,
        schedule_time: request.schedule_time,
        estimate_time: request.estimate_time,
        estimate_price: request.estimate_price,
        description: request.description,
        address: request.address,
        request_issues: request.request_issues,
        city: request.city,
        district: request.district
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: createRequestSuccess.type,
    onError: createRequestFail.type,
})
import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './apiActions';
import constants from '../utils/constants';

const request = createSlice({
    name: 'request',
    initialState: {
        message: '',
        isLoading: false,
        requestDetail: {},
        onGoingRequests: [],
        executingRequest: [],
        completeRequest: [],
        canceledRequest: []
    },
    reducers: {
        onRequestStarted: (request, action) => {
            console.log(action)
            request.message = ''
            request.requestDetail = {}
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
        listRequestSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
            request.onGoingRequests = action.payload.listFindingRequest
            request.executingRequest = action.payload.listProcessingRequest
            request.completeRequest = action.payload.listCompletedRequest
            request.canceledRequest = action.payload.listCancelledRequest
        },
        listRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        updateListRequestSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        updateListRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        getRequestDetailSuccess: (request, action) => {
            console.log(action)
            request.isLoading = false
            request.requestDetail = action.payload
            console.log(request.requestDetail)
        },
        getRequestDetailFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
        cancelRequestSuccess: (request, action) => {
            if (action.payload.message != 'Can not cancel this request') {
                request.message = constants.CANCEL_REQUEST_SUCCESSFULLY
            }
            console.log(action)
            request.isLoading = false
        },
        cancelRequestFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
    }
})

export default request.reducer
export const { onRequestStarted,
    createRequestSuccess,
    createRequestFail,
    clearMessage,
    listRequestFail,
    listRequestSuccess,
    updateListRequestFail,
    updateListRequestSuccess,
    getRequestDetailFail,
    getRequestDetailSuccess,
    cancelRequestFail,
    cancelRequestSuccess } = request.actions

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

export const listAllRequest = (token, customer_id) => apiCallBegan({
    url: '/api/getInitListRequest',
    headers: {
        Authorization: token,
    },
    data: {
        customer_id: customer_id,
        role: constants.ROLE_CUSTOMER
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: listRequestSuccess.type,
    onError: listRequestFail.type,
})

export const updateListRequest = (token, customer_id, status) => apiCallBegan({
    url: '/api/',
    headers: {
        Authorization: token,
    },
    data: {
        customer_id: customer_id
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: '',
    onError: '',
})

export const getRequestDetail = (token, request_id) => apiCallBegan({
    url: '/api/getRequestDetail',
    headers: {
        Authorization: token,
    },
    data: {
        request_id: request_id
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: getRequestDetailSuccess.type,
    onError: getRequestDetailFail.type,
})

export const cancelRequest = (token, request_id, cancel_reason) => apiCallBegan({
    url: '/api/cancelRequest',
    headers: {
        Authorization: token,
    },
    data: {
        request_id: request_id,
        cancel_by: constants.ROLE_CUSTOMER,
        cancel_reason: cancel_reason
    },
    method: 'POST',
    onStart: onRequestStarted.type,
    onSuccess: cancelRequestSuccess.type,
    onError: cancelRequestFail.type,
})
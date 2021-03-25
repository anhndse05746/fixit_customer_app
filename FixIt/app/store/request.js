import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './apiActions';
import constants from '../utils/constants';

const request = createSlice({
    name: 'request',
    initialState: {
        message: '',
        isLoading: false,
        requestDetail: {
            "id": 73,
            "schedule_time": "2021-03-25T18:46:05.000Z",
            "estimate_time": 10,
            "estimate_price": "100.00",
            "description": "Kong bit ",
            "address": "1379 Giải Phóng",
            "district": "Hoàng Mai ",
            "city": "Hà Nội ",
            "createdAt": "2021-03-25T18:46:31.000Z",
            "updatedAt": "2021-03-25T18:46:31.000Z",
            "customer_id": 31,
            "repairer_id": 1,
            "service_id": 6,
            "service": {
                "id": 6,
                "name": "Sửa máy nước nóng",
                "issues": [
                    {
                        "id": 26,
                        "name": "Máy nước nóng không nóng"
                    },
                    {
                        "id": 27,
                        "name": "Máy nước nóng rò rỉ điện"
                    },
                    {
                        "id": 28,
                        "name": "Máy nước nóng chảy nước"
                    },
                    {
                        "id": 29,
                        "name": "Máy nước nóng không hoạt động"
                    },
                    {
                        "id": 33,
                        "name": "Issue test1"
                    }
                ]
            },
            "Customer": {
                "id": 31,
                "name": "DuyAnh"
            },
            "Repairer": {
                "id": 1,
                "name": "đang tìm thợ"
            },
            "request_issues": [
                {
                    "request_id": 73,
                    "issues_id": 26,
                    "createdAt": "2021-03-25T18:46:33.000Z",
                    "updatedAt": "2021-03-25T18:46:33.000Z",
                    "issue": {
                        "id": 26,
                        "name": "Máy nước nóng không nóng"
                    }
                }
            ],
            "invoice": null,
            "request_statuses": [
                {
                    "request_id": 73,
                    "status_id": 1,
                    "cancel_by": null,
                    "cancel_reason": null,
                    "createdAt": "2021-03-25T18:46:33.000Z",
                    "updatedAt": "2021-03-25T18:46:33.000Z",
                    "status": {
                        "id": 1,
                        "name": "Đang tìm thợ"
                    }
                }
            ]
        }
        ,
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
        },
        getRequestDetailFail: (request, action) => {
            console.log(action)
            request.isLoading = false
        },
    }
})

export default request.reducer
export const { onRequestStarted, createRequestSuccess, createRequestFail, clearMessage, listRequestFail, listRequestSuccess, updateListRequestFail, updateListRequestSuccess, getRequestDetailFail, getRequestDetailSuccess } = request.actions

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
        customer_id: customer_id
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
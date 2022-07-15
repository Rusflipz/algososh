import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    string: Array<any>,
    stringSucsess: boolean,
    stringButtonLoader: boolean,
    fibonacci: number,
    fibonacciSucsess: boolean,
    fibonacciButtonLoader: boolean,
    stack: string,
    queue: string,
    isStackEmpty: boolean,
    stackSucsess: boolean,
    stackButtonActive: boolean,
    deleteStack: boolean,
    clearStack: boolean,
    queueSucsess: boolean,
    queueButtonActive: boolean,
    deleteQueueButton: boolean,
    clearQueueButton: boolean,
}


export const initialState: CounterState = {
    string: [],
    stringSucsess: false,
    stringButtonLoader: false,
    fibonacci: 0,
    fibonacciSucsess: false,
    fibonacciButtonLoader: false,
    stack: '',
    queue: '',
    isStackEmpty: true,
    stackSucsess: false,
    stackButtonActive: true,
    deleteStack: false,
    clearStack: false,
    queueSucsess: false,
    queueButtonActive: true,
    deleteQueueButton: false,
    clearQueueButton: false,
}

export const stringSlice = createSlice({
    name: 'string',
    initialState,
    reducers: {

        getString: (state, { payload }) => {
            state.string = payload
            state.stringSucsess = true
            // state.stringButtonActive = false
        },
        getFibonacci: (state, { payload }) => {
            state.fibonacci = payload
            state.fibonacciSucsess = true
            // state.fibonacciButtonActive = false
        },
        getStack: (state, { payload }) => {
            state.stack = payload
            state.stackSucsess = true
            state.stackButtonActive = false
        },
        doStringButtonLoader: (state) => {
            state.stringButtonLoader = true
        },
        doStringButtonNormal: (state) => {
            state.stringButtonLoader = false
        },
        doFibonacciButtonLoader: (state) => {
            state.fibonacciButtonLoader = true
        },
        doFibonacciButtonNormal: (state) => {
            state.fibonacciButtonLoader = false
        },
        doStringFalse: (state) => {
            state.stringSucsess = false
        },
        doFibonacciFalse: (state) => {
            state.fibonacciSucsess = false
        },
        doStackFalse: (state) => {
            state.stackSucsess = false
        },
        doStackFull: (state) => {
            state.isStackEmpty = false
        },
        doStackEmpty: (state) => {
            state.isStackEmpty = true
        },
        getQueue: (state, { payload }) => {
            state.queue = payload
            state.queueButtonActive = false
        },
        deleteQueueButtonActive: (state) => {
            state.deleteQueueButton = true
        },
        deleteQueueButtonDisable: (state) => {
            state.deleteQueueButton = false
        },
        clearQueueButtonActive: (state) => {
            state.clearQueueButton = true
        },
        clearQueueButtonDisable: (state) => {
            state.clearQueueButton = false
        },
    }
})

export const {
    getString, getFibonacci, doStringButtonLoader, doStringButtonNormal, doFibonacciButtonLoader, doFibonacciButtonNormal, doStringFalse,
    doFibonacciFalse, getStack, doStackFull, doStackEmpty, doStackFalse, getQueue, deleteQueueButtonActive, deleteQueueButtonDisable,
    clearQueueButtonActive, clearQueueButtonDisable

} = stringSlice.actions

export const stringSelector = (state: { string: any; }) => state.string

export default stringSlice.reducer
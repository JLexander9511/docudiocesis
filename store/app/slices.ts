import { createSlice } from '@reduxjs/toolkit';

type appStatus = 'idle' | 'processing' | 'success' | 'error'

interface appStateTypes {
    status: appStatus,
    userName: string,
    parroquia: string,
    role: string,
    errorMessage: string | null,
    message: string | null,
    secSelector: string,
    cookie: string
}

const initialState: appStateTypes = {
    status: 'idle',
    userName: '',
    parroquia: '',
    role: '',
    errorMessage: null,
    message: null,
    secSelector: 'bautismo',
    cookie: ''
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelector: (state,{payload}) => {
            state.secSelector = payload
        },
        setUsername: (state,{payload}) => {
            state.userName = payload
        },
        setParroquia: (state,{payload}) => {
            state.parroquia = payload
        },
        setRole: (state,{payload}) => {
            state.role = payload
        },
        setIdle: (state) => {
            state.status = 'idle'
        },
        setSuccess: (state, {payload}) => {
            state.status = 'success'
            state.message = payload
        },
        setError: (state, {payload}) => {
            state.status = 'error'
            state.errorMessage = payload
        },
        setProcessing: (state) => {
            state.status = 'processing'
        },
        setCookie: (state,{payload}) => {
            state.cookie = payload
        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    setUsername,
    setParroquia,
    setRole,
    setIdle,
    setSuccess,
    setError,
    setProcessing,
    setSelector,
    setCookie
 } = appSlice.actions;
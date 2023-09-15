import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const registersSlice = createSlice({
    name: 'registers',
    initialState: {
        registers: [],
        register: {},
        processing: false,
        fetching: false,
        message: "",
        error: "",
    },
    reducers: {
        initialStateRegister(state) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
                emailDisabledField: false
            }
        },
        requestFetchRegisters(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchRegistersSuccess(state, action) {
            return {
                registers: action.payload,
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchRegistersError(state) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestFetchRegister(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: true,
                message: "",
                error: "",
            }
        },
        fetchRegisterSuccess(state, action) {
            return {
                registers: [],
                register: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        fetchRegisterError(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }

        },
        requestCreateRegister(state, action) {
            return {
                registers: [],
                register: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        createRegisterSuccess(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        createRegisterError(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestUpdateRegister(state, action) {
            return {
                registers: [],
                register: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        updateRegisterSuccess(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        updateRegisterError(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestDeleteRegister(state, action) {
            return {
                registers: [],
                register: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        deleteRegisterSuccess(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: action.payload,
                error: "",
            }
        },
        deleteRegisterError(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
        requestSigninRegister(state, action) {
            return {
                registers: [],
                register: {},
                processing: true,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinRegisterSuccess(state, action) {
            return {
                registers: [],
                register: action.payload,
                processing: false,
                fetching: false,
                message: "",
                error: "",
            }
        },
        signinRegisterError(state, action) {
            return {
                registers: [],
                register: {},
                processing: false,
                fetching: false,
                message: "",
                error: action.payload,
            }
        },
    }
})

export const getRegistersThunk = () => dispatch => {
    dispatch(requestFetchRegisters())
    axios.get(`http://44.197.107.144:4000/ingresos`)
        .then(res => {dispatch(fetchRegistersSuccess(res.data))
        })
        .catch(error => {
            if (error.response?.status === 400) {
                dispatch(fetchRegistersError(error.response?.data))
            }
        })
};


export const getRegisterThunk = (registers_id) => dispatch => {
    dispatch(requestFetchRegister());
    axios.get(`http://44.197.107.144:4000/ingresos/${registers_id}`)
    .then(res => {dispatch(fetchRegisterSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(fetchRegisterError(error.response?.data))
        }
    })
};

export const createRegisterThunk = (data) => dispatch => {
    dispatch(requestCreateRegister())
    axios.post(`http://44.197.107.144:4000/ingresos/register`, data)
    .then(res => {dispatch(createRegisterSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(createRegisterError(error.response?.data))
        }
    })
};


export const updateRegisterThunk = (register_id, data) => dispatch => {
    dispatch(requestUpdateRegister())
    axios.put(`http://44.197.107.144:4000/ingresos/register/${register_id}`, data)
    .then(res => {dispatch(updateRegisterSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(updateRegisterError(error.response?.data))
        }
    })
};


export const deleteRegisterThunk = (register_id) => dispatch => {
    dispatch(requestDeleteRegister())
    axios.delete(`http://44.197.107.144:4000/ingresos/register/${register_id}`)
    .then(res => {dispatch(deleteRegisterSuccess(res.data))
    })
    .catch(error => {
        if (error.response?.status === 400) {
            dispatch(deleteRegisterError(error.response?.data))
        }
    })
};

export const { initialStateRegister,
    requestFetchRegisters,
    fetchRegistersSuccess,
    fetchRegistersError,
    requestFetchRegister,
    fetchRegisterSuccess,
    fetchRegisterError,
    requestCreateRegister,
    createRegisterSuccess,
    createRegisterError,
    requestUpdateRegister,
    updateRegisterSuccess,
    updateRegisterError,
    requestDeleteRegister,
    deleteRegisterSuccess,
    deleteRegisterError,
    requestSigninRegister,
    signinRegisterSuccess,
    signinRegisterError } = registersSlice.actions;

export default registersSlice.reducer;
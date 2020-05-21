import React, { useReducer } from 'react';
import AuthContext from './context';
import AuthReducer from './reducer';

import tokenAuth from '../../config/tokenAuth';
//Types imports
import {
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    GET_USER,
    SIGNIN_SUCCESS,
    SIGNIN_ERROR,
    SIGN_OUT,
    BYE_ERROR
} from '../../types'
//notiestack
//axiosClient import
import axiosClient from '../../config/axios'
const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        authentication: null,
        user: null,
        field: null,
        msg: null,
        error: false,
        submit: false,
        loading: true,
        signedIn: false
    }

    // use Reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Dispatch actions
    //Functions for CRUD
    const byeError = () => {
        dispatch({
            type: BYE_ERROR
        })
    }
    const signUpUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/users', data);
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: response.data
            })

            // Once a succeded sign in, lets get the auth user
            getAuthUser()

        } catch (error) {

            if (error.response.data.errors) {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: error.response.data.errors[0]
                })
            } else {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: error.response.data
                })
            }


        }
    }

    //Return authenticated user
    const getAuthUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            //Function to send token by headers
            tokenAuth(token);
        }
        try {
            const response = await axiosClient.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {

            dispatch({
                type: SIGNIN_ERROR,
                payload: error.response.data
            })
        }
    }

    const signInUser = async (data) => {
        try {
            const response = await axiosClient.post('/api/auth', data);

            dispatch({
                type: SIGNIN_SUCCESS,
                payload: response.data
            })

            getAuthUser();
        } catch (error) {
            if (error.response.data.msg) {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: error.response.data
                })
            } else {
                dispatch({
                    type: SIGNUP_ERROR,
                    payload: error.response.data.errors[0]
                })
            }
        }
    }


    const signOutUser = async () => {
        dispatch({
            type: SIGN_OUT,
            payload: initialState
        })
    }

    //
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authentication: state.authentication,
                user: state.user,
                msg: state.msg,
                field: state.field,
                error: state.error,
                submit: state.submit,
                loading: state.loading,
                signedIn: state.signedIn,
                signUpUser,
                signInUser,
                signOutUser,
                byeError,
                getAuthUser,

            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState;

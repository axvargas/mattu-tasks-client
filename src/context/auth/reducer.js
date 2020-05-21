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

export default (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case BYE_ERROR:
            return {
                ...state,
                msg: null,
                error: false
            }
        case SIGNUP_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                authentication: true,
                msg: null,
                error: null,
                submit: !state.submit,
                loading: false,
                signedIn: true,
            }
        case SIGNIN_ERROR: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authentication: false,
                msg: payload.msg,
                error: true,
                submit: !state.submit,
                loading: false,
                signedIn: false,
            }
        }
        case SIGNUP_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authentication: false,
                msg: payload.msg,
                field: payload.field,
                error: true,
                submit: !state.submit,
                loading: false,
                signedIn: false,
            }
        case GET_USER:
            return {
                ...state,
                authentication: true,
                user: payload,
                loading: false,
                signedIn: true,

            }
        case SIGNIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                authentication: true,
                msg: null,
                error: null,
                submit: !state.submit,
                loading: false,
                signedIn: true,
            }
        case SIGN_OUT:
            localStorage.removeItem('token');
            return {
                ...payload,
                token: null,
                loading: false,
                authentication: null,
                msg: null,
                signedIn: false,
            }

        default:
            break;
    }
}
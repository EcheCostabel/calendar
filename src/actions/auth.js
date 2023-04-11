import Swal from "sweetalert2";
import { fetchWithToken, fetchWithoutToken } from "../helpers/fetch";
import { types } from "../types/types";



export const startLogin = (email, password) => {
    return async(dispatch) => {

        const resp = await fetchWithoutToken('auth', { email, password}, 'POST');
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem('token', body.token);  //si el usuario ingresa me va a guardar el 'token' que esta en body.token
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
};


const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }
};



export const startRegister = (email, password, name) => {
    return async(dispatch) => {
        const resp = await fetchWithoutToken('auth/new', { email, password, name}, 'POST');
        const body = await resp.json();

        if(body.ok) {
            localStorage.setItem('token', body.token);  //si el usuario ingresa me va a guardar el 'token' que esta en body.token
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
};



export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithToken('auth/renew');
        const body = await resp.json();
        console.log(body)
        

        if(body.ok) {
            localStorage.setItem('token', body.token);  //si el usuario ingresa me va a guardar el 'token' que esta en body.token
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
            dispatch(checkingFinish())
        }
    }
}

const checkingFinish = () => {
    return {
        type: types.authCheckingFinish
    }
}
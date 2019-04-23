import * as actionTypes from './actionTypes';
import axios from 'axios';
import config from '../../config/setting';


//auth
export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=token=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token
    }
}

export const authFail=error=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expDate');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}


export const checkAuthTimeout=expirationTime=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000)
    }
}


export const authLogin=(username,password)=>{
    return dispatch=>{
        dispatch(authStart());
        axios.post(config.url+'api/auth/token/',{
            username:username,
            password:password
        })
        .then(res=>{
            console.log(res.data)
            const token=res.data.access;
            const expDate=new Date( new Date().getTime()+config.clientLogout*1000);
            sessionStorage.setItem('token',token);
            sessionStorage.setItem('expDate',expDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(config.clientLogout));
        })
        .catch(error =>{dispatch(authFail(error))} );
    }
}

//check user exp time and refresh current user infor
export const authCheckState=()=>{
    return dispatch=>{
        const token=sessionStorage.getItem('token');
        if (token===undefined) {

            dispatch(logout());
        }else{
            const expDate=new Date(sessionStorage.getItem('expDate'));
            if(expDate<=new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout((expDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}


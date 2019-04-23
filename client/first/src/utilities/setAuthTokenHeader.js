import axios from 'axios';

/*

helper funcion for set up the header of request

 */

export const setAuthTokenHeader=(baseUrl,token)=>{
    const instance = axios.create({
        baseURL: baseUrl,
    });

    if(token){
        instance.defaults.headers.common['Authorization']=`Bearer ${token}` ;
    }else{
        delete instance.defaults.headers.common['Authorization'];
    }
    return instance;
}
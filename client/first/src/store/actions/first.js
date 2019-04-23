import * as actionTypes from './actionTypes';
import config from '../../config/setting';
import {setAuthTokenHeader} from '../../utilities/setAuthTokenHeader';


//change page and size

export const firstChangePage=(page)=>{
    return{
        type:actionTypes.FIRST_CHANGE_PAGE,
        page:page
    }
}

export const firstChangePageSize=(pageSize)=>{
    return{
        type:actionTypes.FIRST_CHANGE_PAGE_SIZE,
        pageSize:pageSize
    }
}

//search
export const firstSearchStart=()=>{
    return{
        type:actionTypes.FIRST_SEARCH_START,
    }
}

export const firstSearchSuccess=(firstDataList)=>{
    return{
        type:actionTypes.FIRST_SEARCH_SUCCESS,
        firstDataList:firstDataList,
    }
}

export const firstSearchFail=(error)=>{
    return{
        type:actionTypes.FIRST_SEARCH_FAIL,
        error:error
    }
}


//get attendance list by search
export const searchList=(page,searchParams,pageSize)=>{
    return dispatch=>{
        dispatch(firstSearchStart());
        const token=sessionStorage.getItem('token');
        const instance=setAuthTokenHeader(config.url,token); 
        instance.get('api/first/?page='+page+'&size='+pageSize+searchParams).then(
            res=>{
                dispatch(firstSearchSuccess(res.data));
            }
        )
        .catch(error =>{dispatch(firstSearchFail(error))} );
    }
}
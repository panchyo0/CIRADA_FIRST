import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utilities/updateObject';
import config from '../../config/setting';

const initialState={
    error:null,
    firstDataList:[],
    page:1,
    pageSize:config.pageSize,
    searchLoading:false,

}

//page
const firstChangePage=(state,action)=>{
    return updateObject(state,{
        page:action.page
    })
}

const firstChangePageSize=(state,action)=>{
    return updateObject(state,{
        pageSize:action.pageSize
    })
}

//search
const firstSearchFail=(state,action)=>{
    return updateObject(state,{
        error:action.error,
        searchLoading:false,
    });
}


const firstSearchStart=(state,action)=>{
    return updateObject(state,{
        error:null,
        searchLoading:true,
    })
}

const firstSearchSuccess=(state,action)=>{
    return updateObject(state,{
        firstDataList:action.firstDataList,
        searchLoading:false,
    })
}

const firstReducer=(state=initialState,action)=>{
    switch (action.type){
        //change page
        case actionTypes.FIRST_CHANGE_PAGE:return firstChangePage(state,action);
        case actionTypes.FIRST_CHANGE_PAGE_SIZE:return firstChangePageSize(state,action);
        //search
        case actionTypes.FIRST_SEARCH_START:return firstSearchStart(state,action);
        case actionTypes.FIRST_SEARCH_SUCCESS:return firstSearchSuccess(state,action);
        case actionTypes.FIRST_SEARCH_FAIL:return firstSearchFail(state,action);

        default:
            return state;
    }
}

export default firstReducer;
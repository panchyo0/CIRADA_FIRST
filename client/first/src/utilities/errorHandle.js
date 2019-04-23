import React from 'react';
import {Alert} from 'antd';

/*
error handler
*/
export const errorHandler=(error,model)=>{
    let errorMessage=null;
    if (error) {
        if(error.response){
            if (error.response.status===403){
                return errorMessage=(
                    <Alert message={'Permissions Denied ('+model+').'} type="error" showIcon/>
                );
            }else if(error.response.data.error_messege){
                return errorMessage=(
                    <Alert message={error.response.data.error_messege+'('+model+')'} type="error" showIcon/>
                );
            }else{
                return errorMessage=(
                    <Alert message={error.message+'('+model+')'} type="error" showIcon/>
                );
            }
        }else{
            return errorMessage=(
                <Alert message={error.message+'('+model+')'} type="error" showIcon/>
            );
        }
        
    }
    return errorMessage; 
}
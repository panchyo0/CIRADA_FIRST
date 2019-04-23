
//update old state (old state infor remains)

export const updateObject=(oldObject,updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    }
}
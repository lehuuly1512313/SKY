import * as Types from './../Constants/actiontype'



export const TOGGLE_STATUS = () =>{
    return {
        type: Types.TOGGLE_STATUS
    }
}

export const SORT = (sort) =>{
    return {
        type: Types.SORT,
        sort
    }
}
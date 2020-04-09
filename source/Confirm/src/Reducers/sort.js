var initialState  = {
    sort: {
        by: 'status',
        value: 1
    }
}

var Reducer = (state = initialState, action)=>{
    if(action.type === 'SORT')
    {
        var {by,value } = action.sort;
        return {
            sort:
            {
                by,
                value
            }
        }
    }
    return state;
}

export default Reducer;
var initialState  = false;

var Reducer = (state = initialState, action)=>{
    if(action.type === 'TOGGLE_STATUS')
        state = !state;
    return state;
}

export default Reducer;
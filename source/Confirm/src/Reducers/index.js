import status from './status';
import sort from './sort'
import {combineReducers} from 'redux'

const Reducer = combineReducers({
    status,
    sort
});


export default Reducer;
import {createStore} from 'redux';
import {TOGGLE_STATUS, SORT} from './Action/index'
import Reducer from './Reducers/index'

const store = createStore(Reducer);
console.log('Default: ', store.getState());


store.dispatch(TOGGLE_STATUS());
console.log("TOGGLE_STATUS: ", store.getState());


store.dispatch(SORT({
        by : "name",
        value: -1
}));
console.log("SORT: ", store.getState());
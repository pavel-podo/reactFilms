import {createStore, combineReducers} from 'redux'
import {exampeValueReducer } from './reducers/exampeValue'
const rootReducer = combineReducers({
    main :exampeValueReducer,  
}) 
export default createStore(rootReducer)
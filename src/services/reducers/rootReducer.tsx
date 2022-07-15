import { combineReducers } from 'redux';

import stringReducer from '../slice/slice';


export const rootReducer = combineReducers({
    string: stringReducer,
})
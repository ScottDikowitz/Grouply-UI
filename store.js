import {createStore, combineReducers} from 'redux';

import chatReducer from './reducers/chat';
import userReducer from './reducers/user';

var reducers = combineReducers({
    chatReducer: chatReducer,
    UserReducer: userReducer
});

var store = createStore(reducers);

export default store;

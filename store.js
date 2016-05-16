import {createStore, combineReducers} from 'redux';

import ChatReducer from './reducers/chat';
import UserReducer from './reducers/user';
import BrowserReducer from './reducers/browser';

var reducers = combineReducers({
    ChatReducer: ChatReducer,
    UserReducer: UserReducer,
    BrowserReducer: BrowserReducer
});

var store = createStore(reducers);

export default store;

import {createStore, combineReducers} from 'redux';

import ChatReducer from './reducers/chat';
import UserReducer from './reducers/user';

var reducers = combineReducers({
    ChatReducer: ChatReducer,
    UserReducer: UserReducer
});

var store = createStore(reducers);

export default store;

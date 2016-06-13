import objectAssign from 'object-assign';

var userInitialState = {
    user: {id: '', name: ''}, users: [], chats: []
};

export default function(state = userInitialState, action){
    switch(action.type) {
        case 'FOUND_USER':
            var newState = objectAssign({}, state);
            newState.user = action.user;
            return newState;
        case 'USERS_FOUND':
            var newState = objectAssign({}, state);
            newState.users = action.users;
            return newState;
        case 'ADD_PRIVATE_CHATS':
            var newState = objectAssign({}, state);
            newState.chats = action.users;
            return newState;
        default:
            return state;
    }


}

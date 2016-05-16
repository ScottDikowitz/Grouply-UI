var userInitialState = {
    user: {id: '', name: ''}, users: []
};

export default function(state = userInitialState, action){
    switch(action.type) {
        case 'FOUND_USER':
            var newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case 'USERS_FOUND':
            var newState = Object.assign({}, state);
            newState.users = action.users;
            return newState;
        default:
            return state;
    }


}

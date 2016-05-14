var userInitialState = {
    user: {id: '', name: ''}
};

export default function(state = userInitialState, action){
    switch(action.type) {
        case 'FOUND_USER':
            var newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;

        default:
            return state;
    }


}

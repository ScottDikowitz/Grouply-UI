var chatInitialState = {
    chat: [], rooms: []
};

export default function(state = chatInitialState, action){
    switch(action.type) {
        case 'ADD_MESSAGE':
            var newState = {chat: state.chat.slice(), rooms: action.message.rooms};
            newState.chat.push(action.message);
            return newState;
        case 'RESET_MESSAGES':
            var newState = {chat: [], rooms: []};
            return newState;
        default:
            return state;
    }
}

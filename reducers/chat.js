var chatInitialState = {
    chat: [], rooms: []
};

export default function(state = chatInitialState, action){
    switch(action.type) {
        case 'ADD_MESSAGE':
            var rooms = [];
            var newState = {chat: state.chat.slice(), rooms: state.rooms.slice()};
            newState.chat.push(action.message);
            return newState;
        case 'RESET_MESSAGES':
            var newState = {chat: [], rooms: state.rooms.slice()};
            return newState;
        default:
            return state;
    }
}

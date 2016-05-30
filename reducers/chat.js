var chatInitialState = {
    chat: [], rooms: []
};

export default function(state = chatInitialState, action){
    switch(action.type) {
        case 'ADD_MESSAGE':
            var newState = {chat: state.chat.slice(), rooms: state.rooms.slice()};
            newState.chat.push(action.message);
            return newState;
        case 'ADD_MESSAGES':
            var newState = {chat: state.chat.slice(), rooms: state.rooms.slice()};
            action.messages.forEach((el)=>{
                newState.chat.push({comment: el.comment, user: {name: el.name, id: el.id}});
            });
            return newState;
        case 'RESET_MESSAGES':
            var newState = {chat: [], rooms: state.rooms.slice()};
            return newState;
        default:
            return state;
    }
}

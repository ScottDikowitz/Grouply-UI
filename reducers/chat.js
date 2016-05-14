var chatInitialState = {
    chat: []
};

export default function(state = chatInitialState, action){
    switch(action.type) {
        case 'ADD_MESSAGE':
            var newState = {chat: state.chat.slice()};
            newState.chat.push(action.message);
            return newState;

        default:
            return state;
    }
}

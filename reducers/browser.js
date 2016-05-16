var browserInitialState = {
    dimensions: {width: 0, height: 0}
};

export default function(state = browserInitialState, action){
    switch(action.type) {
        case 'SET_DIMENSIONS':
            var newState = {dimensions: {width: action.dimensions.width,
                                         height: action.dimensions.height}};
            return newState;
        default:
            return state;
    }
}

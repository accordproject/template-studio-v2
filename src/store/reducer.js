const initialState = {
    amount:20
};

const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){
        case 'ACTION_ONE': 
            newState.amount += action.value;
            break;
        
        case 'ACTION_TWO': 
            newState.amount -= action.value;
            break;
    }
    return newState;
};

export default reducer;
const initialState = {
    templatesAP: []
};

const AP_TEMPLATES_RECEIVED = 'AP_TEMPLATES_RECEIVED';

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AP_TEMPLATES_RECEIVED:
            return {...state, templatesAP: action.templates};
        default:
            return state;
    }
};

export default reducer;
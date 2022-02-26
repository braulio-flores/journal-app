import { types } from "../types/types";

const inicialState = {
    loading: false,
    messageError: ''
};

export const uiRreducer = (state = inicialState, action) =>{
    
    switch (action.type) {
        case types.uiSetMessage:            
        return ({
            ...state,
            messageError:action.payload
        });

        case types.uiRemoveMessage:
            
        return ({
            ...state,
            messageError:''
        });

        case types.uiStartLoading:            
        return ({
            ...state,
            loading:true
        });

        case types.uiFinishLoading:            
        return ({
            ...state,
            loading:false
        });
    
        default:
            return state;
    }
}
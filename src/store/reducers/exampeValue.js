import { EDIT_EXAMPLE } from '../types'
const initialState = {
    mainValue: '2'
}

export const exampeValueReducer = (state = initialState, action) => {
    
    //console.log('state',state)
    switch (action.type) {
        case EDIT_EXAMPLE:
            console.log('action',action)
            return {
                ...state, 
                mainValue: action.payload
            }
        default: return state
    }
    return state;
}
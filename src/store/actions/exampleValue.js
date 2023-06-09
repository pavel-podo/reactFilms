import { EDIT_EXAMPLE } from '../types'


export const editExample = valueExample => {
    return {
        type: EDIT_EXAMPLE,
        payload: valueExample
    }



}

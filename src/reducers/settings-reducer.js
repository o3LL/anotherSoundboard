import { CHANGE_CONFIG } from '../actions/settings-actions';


export default function config(state = [], action) {
    switch (action.type) {
        case CHANGE_CONFIG: {
            return Object.assign({}, state, action.payload)
        }

        default:
            return state;
    }
}

import { advertConstants } from '../constants/advert.constants';

export function addadvert(state = {}, action) {
    switch (action.type) {
        case advertConstants.ADD_REQUEST:
            return { adding: true };
        case advertConstants.ADD_SUCCESS:
            return { adding: true };
        case advertConstants.ADD_FAILURE:
            return {};
        default:
            return state
    }
}
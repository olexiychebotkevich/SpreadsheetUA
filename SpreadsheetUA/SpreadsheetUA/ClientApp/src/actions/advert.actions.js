import { advertConstants } from '../constants/advert.constants';
import { advertService } from '../services/advert.service';
import { alertActions } from './';
import { history } from '../helpers';
export const advertActions = {
add

};

function add(Title,Description,Image,UserId,token) {
    return dispatch => {
        dispatch(request({ Description }));
        console.log("Title: " + Title + " Description: " + Description + " Image " + Image + " UserId " + UserId);
   
        advertService.add(Title, Description, Image, UserId,token)
            .then(
            advert => {
                console.log("advert ", advert);
                    dispatch(success(advert));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(advert) { return { type: advertConstants.ADD_REQUEST, advert } }
    function success(advert) { return { type: advertConstants.ADD_SUCCESS, advert } }
    function failure(error) { return { type: advertConstants.ADD_FAILURE, error } }
}

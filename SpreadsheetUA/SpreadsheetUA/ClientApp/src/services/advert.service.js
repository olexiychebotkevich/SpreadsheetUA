
export const advertService = {
    add
    //,
    //getall,
    //deleteadvert

};

function add(Title, Description, Image, UserId,token) {
    console.log("Title: " + Title + " Description: " + Description + " Image " + Image + " UserId " + UserId);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify({ Title, Description, Image, UserId})
    };

    return fetch(`api/advert/add`, requestOptions)
        .then(handleResponse)
        .then(advert => {
            return advert;
        });
}







//function delete(user) {
//    const requestOptions = {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(user)
//    };


//    return fetch(`api/registration/registration`, requestOptions).then(handleResponse);
//}





function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            // if (response.status === 401) {
            //     // auto logout if 401 response returned from api
            //     logout();
            //     location.reload(true);
            // }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
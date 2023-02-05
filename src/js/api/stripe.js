
const axios = require('axios');
export function createPaymentIntent() {
    console.log("create pi");
    axios.get('/v1/stripe').then(function (response) {
        console.log(JSON.stringify(response.data));
        return response.data;    
    }).catch(function (error) {
        console.log(error);
    });
}

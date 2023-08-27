import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
//import { loadStripe } from '@stripe/stripe-js';
import CreditCardForm from './CreditCardForm';
import { Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router';

const stripePromise = '';//loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
const axios = require('axios');


const Payment = () => {
    const [options, setOptions] = useState(null);
    const [paymentMethods, setPM] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/v1/payment-methods?customerId=cus_KghW4pnbKOHii4`).then(function (response) {
            setPM(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const addNewCard = (e) => {
        axios.post('/v1/payment-methods/intent?saveNew=true').then(function (response) {
            const newOptions = {
                // passing the client secret obtained in step 2
                clientSecret: response.data.client_secret,
                // Fully customizable with appearance API.
                appearance: {/*...*/ },
            }
            setOptions(newOptions);
        }).catch(function (error) {
            console.log(error);
        });
    };

    const handleChange = async (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const confirmPayment = async (e) => {

        e.preventDefault();
        if (selectedPaymentMethod != null) {
            const returnUrl = 'http://localhost:3000/checkout/confirmation';
            axios.post(`/v1/payment-methods/intent?paymentMethodId=${selectedPaymentMethod}&&customerId=cus_KghW4pnbKOHii4&&confirm=true&returnUrl=${returnUrl}`).then((response) => {
                navigate(`/checkout/confirmation?payment_intent_client_secret=${response.data.client_secret}`);
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    if (!options && paymentMethods != null) {

        const pmComps = paymentMethods.map(pm => {
            const labeldesc = `${pm.creditCard.brand} ****${pm.creditCard.last4}`;
            return <FormControlLabel value={pm.id} control={<Radio />} label={labeldesc} />
        })
        return (<div>
            {pmComps.length > 0 && <FormControl component="fieldset">
                <FormLabel component="legend">Payment Methods</FormLabel>
                <RadioGroup
                    aria-label="payment-methods"
                    name="controlled-radio-buttons-group"
                    onChange={handleChange}
                >
                    {pmComps}
                </RadioGroup>
            </FormControl>}
            <Button variant="outlined" fullWidth={100} onClick={addNewCard}>Add New Card</Button>
            <Button variant="contained" fullWidth={100} onClick={confirmPayment}>Confirm</Button>
        </div>)
    }
    if (options != null) {
        return (
            <Elements stripe={stripePromise} options={options}>
                <CreditCardForm />
            </Elements>

        );
    }
    return <CircularProgress />


}

export default Payment;
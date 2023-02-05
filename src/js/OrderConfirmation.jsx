import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router";
import PaymentStatus from "./PaymentStatus";

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const OrderConfirmation = () => {
    
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const piClientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret'
    );

    return (
        <div>
            <h1>Confirmed</h1>
            <Elements stripe={stripePromise}><PaymentStatus piClientSecret={piClientSecret} /></Elements>
        </div>);
};

export default OrderConfirmation;
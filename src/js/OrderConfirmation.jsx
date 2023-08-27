

const OrderConfirmation = () => {
    
    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js

    return (
        <div>
            <h1>Confirmed</h1>
            {/*<Elements stripe={stripePromise}><PaymentStatus piClientSecret={piClientSecret} /></Elements>*/}
        </div>);
};

export default OrderConfirmation;
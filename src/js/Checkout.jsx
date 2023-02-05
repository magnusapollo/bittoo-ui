import { Box, Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Cookies from 'universal-cookie';
import AddressForm from './Address';
import Payment from './Payment';

const axios = require('axios');

const Checkout = (props) => {
  const location = useLocation();
  const cartId = location.state.cartId;
  const [shipping, setShipping] = useState(null);
  const [proceedToPayment, setProceedToPayment] = useState(false)
  const [customer, setCustomer] = useState({})
  const [addNewAddress, setAddNewAddress] = useState(false);
  useEffect(() => {
    const cartId = location.state.cartId;
    
    const url = `/v1/carts/${cartId}/checkout`;
    const cookies = new Cookies()
    const accessTokenCookie = cookies.get('access_token');
    const customerId = cookies.get('customerId');
    console.log("Checkout page: " + customerId);
    if (customerId === undefined && accessTokenCookie === undefined) { 
      // ask customer to login

    } else if (accessTokenCookie === undefined) {
      // customer wants to do guest checkout, so we wont have shipping address info

    } else {
      // we have customer info
      console.log("Calling get customer");
      const customerUrl = `/v1/customers/${customerId}`
      axios.get(customerUrl).then((response) => {
        console.log(response.data);
         setCustomer(response.data);
        return axios.post(url, response.data.addresses[0])
      }).then((response) => {
        console.log("Response from checkout");
        console.log(response.data);
        const checkoutDetails = response.data;
        setShipping(checkoutDetails.shippingAddress);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, []);

  const addShipping = (name, line1, line2, line3, city, state, zip, country) => {
    const url = `/v1/carts/${cartId}/checkout/shipping`;
    axios.post(url, { 'name': name, 'line1': line1, 'line2': line2, 'line3': line3, 'city': city, 'state': state, 'zip': zip})
      .then((response) => {
        const checkoutDetails = response.data;
        setShipping(checkoutDetails.shippingAddress);
        setAddNewAddress(false);
        const customerUrl = `/v1/customers/${customer.id}`
        return axios.post(customerUrl+"/addresses", checkoutDetails.shippingAddress);
    }).catch((error) => {
      console.log(error);
    });
  }

  let otherAddrs = undefined;
  if(customer != null && customer.addresses !== null && customer.addresses !== undefined) {
    otherAddrs = customer.addresses.map((addr) => {
      return <FormControlLabel control={<Radio />} checked="false" label={addr.line1} />
    })
  }

  return (
    <Container>
      {!proceedToPayment && shipping !== null &&   
      <Container>
        <FormControl>
          <RadioGroup>
          <FormControlLabel value = {shipping}    
              label={shipping.line1 + ", " + shipping.line2 + ", "+ shipping.city} checked="true" control={<Radio />}>
              
            </FormControlLabel>
            {otherAddrs}
          </RadioGroup>
        </FormControl>
        <Stack>
          {!addNewAddress && <Button sx = {{width: 10}} variant='text' onClick={() => {setAddNewAddress(true)}}>Add new address</Button>}
          {!addNewAddress && <Button sx = {{width: 10}} variant="contained" size="small" label="Payment" onClick={() => { setProceedToPayment(true) }} >Payment</Button>}
        </Stack>
      </Container>}
      {!proceedToPayment && shipping == null && <Box><AddressForm handleSubmit={addShipping} /><Button>Add new Address</Button></Box>}
      {proceedToPayment && shipping !== null && <Payment></Payment>}
      {addNewAddress && <Box><AddressForm handleSubmit={addShipping} /><Button>Add new Address</Button></Box>}
    </Container>
  );
};

export default Checkout;

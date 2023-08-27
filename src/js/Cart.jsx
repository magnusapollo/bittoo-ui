import { Button, Card, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CartItemCard from './CartItemCard';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Box } from '@mui/system';
import AppBarWrapper from './AppBarWrapper';
const axios = require('axios');

const Cart = (props) => {
    let navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const cookies = new Cookies();
        let customerId = cookies.get('customerId');
        customerId = customerId === "null" || customerId === undefined|| customerId === null ? "" : customerId;
        console.log("on cart page, getting cart for customer: " + customerId);
        axios.get(`/v1/carts/`, { headers: { account_id: customerId } }).then((response) => {
            console.log(response.data);
            if(response.status === 204) {
                setCart(null);
                setLoading(false);
                return;
            }
            setCart(response.data);
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        })
    }, []);

    if (loading)
        return <Box><AppBarWrapper page='home'/><CircularProgress /></Box>
    else if (cart == null) {
        return <Box><AppBarWrapper page='home'/><Typography>Your cart is empty!</Typography></Box>
    }
    const cartItems = cart.cartItems.map((item) => { return <CartItemCard item={item} /> });
    return (
        {cart} && <Box>
            <AppBarWrapper page='home'/>
            <Typography variant='h4'>Your Shopping Cart</Typography>
            <Stack spacing={2}> 
                <div>{cartItems}</div>
                <Card>TotalPrice: {cart.totalPrice}</Card>
            </Stack>
            <Button onClick={() => { navigate(`../checkout`, {state: {cartId: cart.id}}); }} variant='contained'> Checkout </Button>
        </Box>
    );
};

export default Cart;

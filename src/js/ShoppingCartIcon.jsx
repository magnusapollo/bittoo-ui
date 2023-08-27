import { ShoppingCart } from "@mui/icons-material";
import { Badge, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const axios = require('axios');
const ShoppingCartIcon = () => {
    const [countItemsInCart, setCountItemsInCart] = useState();
    let navigate = useNavigate();

    const cookie = useMemo(()=> new Cookies(), []);
    
    useEffect(() => {
        const customerId = cookie.get('customerId');
        if (customerId !== null || customerId !== undefined) {
            axios.get(`/v1/carts`, { headers: { account_id: customerId } }).then((response) => {
                console.log(response.data);
                setCountItemsInCart(response.data.cartItems.length);
            }).catch((e) => {
                console.log(e);
            });
        }
    }, [cookie]);

    return <Box sx={{ flexGrow: 1, justifyContent: 'right' }}>
    <Button
     variant='contianed' onClick={() => { navigate('../cart') }}>
        <Badge badgeContent={countItemsInCart}><ShoppingCart /></Badge></Button>
</Box>
};

export default ShoppingCartIcon;

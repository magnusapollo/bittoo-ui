import {Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Carousel from './Carousel';


const axios = require('axios');
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [searchedItem, setSearchedItem] = useState();
    const [top100Items, setTop100Items] = useState([]);
    const [customerId, setCustomerId] = useState('');

    const cartUrl = `/v1/carts`;

    useEffect(() => {
        axios.get('/v1/items?limit=100').then((response) => {
            setTop100Items(response.data);
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        });
        const cookie = new Cookies();
        setCustomerId(cookie.get('customerId'));

    }, []);
    if (loading) {
        return <CircularProgress />
    }

    const addToCart = (item) => {
        console.log("clicked " + item.id);
        // get customer's cart, create new if null
        let cartId = null;
        axios.get(cartUrl, { headers: { account_id: customerId } }).then((response) => {
            console.log(response.status)
            switch (response.status) {
                case 204:
                    console.log("creating cart")
                    axios.post(cartUrl, null, { headers: { account_id: customerId } }).then((response) => {
                        cartId = response.data;
                        console.log("cartId:  "+ cartId);
                        addItemToCart(cartId, item);
                    })
                    break;
                case 200:
                    cartId = response.data.id;
                    addItemToCart(cartId, item);
                    break;
            }

        });
    }

    const addItemToCart = (id, item) => {
        if (id !== null && id !== '') {
            console.log("adding to cart")
            const cartItem = {
                'productId': 'null',
                'itemId': item.id,
                'quantity': 1
            }
            axios.post(cartUrl + `/${id}/items`, cartItem).then((response) => {
                console.log("added to cart " + id);

            })
        }
    }

    return (
        <Box sx ={{ flexGrow: 1}}>
            {searchedItem != null && <Box sx={{
                width: 500,
                height: 200,
                padding: 1,
                backgroundColor: 'primary.light',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}>
                <div>{searchedItem.title}</div>
                <div>{searchedItem.description}</div>
                <div>{searchedItem.price}</div>
                <Button variant="contained" onClick={() => { addToCart(searchedItem) }}>Add to cart</Button>
            </Box>}
            {searchedItem === undefined && top100Items.map(item => {
                return (
                    <Box sx={{
                        width: 500,
                        height: 200,
                        padding: 2,
                        
                        '&:hover': {
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                        <div>{item.title}</div>
                        <div>{item.description}</div>
                        <div>{item.price}</div>
                        <Button variant="contained" onClick={() => { addToCart(item) }}>Add to cart</Button>
                    </Box>)
            })}
        </Box>
    );
};

export default Home;
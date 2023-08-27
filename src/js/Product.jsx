import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AppBarWrapper from './AppBarWrapper';

const axios = require('axios');
const Product = () => {
    
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [item, setItem] = useState();
    const [customerId, setCustomerId] = useState('');
    const location = useLocation();

    useEffect(() => {
        axios.get(`/v1/products/`+location.state.productId).then((response) => {
            setProduct(response.data);
            setItem(response.data.item);
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        });
        const cookie = new Cookies();
        setCustomerId(cookie.get('customerId'));
    }, [location.state.productId]);
    
    const cartUrl = `/v1/carts`;
    
    const addToCart = () => {
        console.log("adding to cart " + item.id);
        // get customer's cart, create new if null
        let cartId = null;
        axios.get(cartUrl, { headers: { account_id: customerId } }).then((response) => {
            console.log(response.status);
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
                default:
                    console.error("Unknown response while get cart")
            }

        });
    };

    const addItemToCart = (id, item) => {
        if (id !== null && id !== '') {
            console.log("adding to cart")
            const cartItem = {
                'itemId': item.id,
                'quantity': 1
            }
            axios.post(cartUrl + `/${id}/items`, cartItem).then((response) => {
                console.log("added to cart " + id);
            })
        }
    };

    const selectItem = (e, v, item) => {
        console.log("selected " + item.id);
        setItem(item);
    };

    

    if(loading) {
        return <CircularProgress sx={{margin:'auto', display:'block'}}/>
    }

    const flavorGridItems = 
        <Grid container spacing={1.5} sx={{paddingLeft: 1, mt: 1, paddingRight: 1}}> 
            {
                product.items.map(item => {
                    return <Grid item xs={3}>
                        <Button onClick={ (e,v) => selectItem(e, v, item)} variant='outlined' sx={{textAlign:"center"}}>
                            {item.flavor}
                        </Button>
                    </Grid>
                })
            }
        </Grid>
    return(<Box>
        <AppBarWrapper page='p' pageProps={{state: {productId: location.state.productId}}} showSearch/>
        <Grid container spacing={1.5} sx={{paddingLeft: 2, mt: 2, paddingRight: 2}}>
            <Grid item  xs={5}>
                <Card variant="outlined" elevation={2}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                    /></Card>
            </Grid>
            <Grid item xs={7}>
                <Card>
                    <CardContent>
                        <Typography>{product.title}</Typography>
                        <Typography>{product.shortDescription}</Typography>
                        <Typography>{product.longDescription}</Typography>
                        <Typography>{product.brand.name}</Typography>
                        <Typography>{product.prices.find(p => p.priceType === "offerPrice").price}</Typography>
                        {
                            product.items.length > 1 
                                ? flavorGridItems
                                :<Typography>{product.items[0].flavor}</Typography>
                        }
                       
                    </CardContent>
                    <Button variant='contained' onClick={addToCart}>Add to cart</Button>
                </Card>
            </Grid>
        </Grid>
        
        </Box>)
}
export default Product;
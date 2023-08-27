import { Badge, Card, CardContent, CardMedia, CircularProgress, Container, Grid, Link, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CategoryCount from './CategoryCount';
const PER_PAGE = 24;

const ProductGrid = ({categoryId, petType, brandId, query, priceRange}) => {
    const [state, setState] = useState({
        loading: true, 
        products: [],
        allProds: [],
        page: 1
    });
    const { products, allProds, page, loading } = state;
    
    useEffect(() => {
        let url = `/v1/products`;
        if (categoryId) {
            url = url + `?categoryId=${categoryId}`   
        } else if (petType) {
            url = url + `?petTypeId=${petType}`
        } else if (query) {
            url =  `/v1/search?query=${query}`
        } 
        if (priceRange) {
            url = url + `&&priceMin=${priceRange[0]}&&priceMax=${priceRange[1]}`
        }
        if (brandId) {
            url = url + `&&brandId=${brandId}`
        } 
        
        axios.get(url).then((response) => {
            setState({ 
                allProds: response.data,
                products: response.data.slice(0, PER_PAGE),
                page: 1,
                loading: false});
        }).catch((e) => {
            console.log(e);
        });
    }, [categoryId, petType, brandId, query, priceRange]);
    
    const handlePageChange = (event, value) => {
        setState({...state, products: allProds.slice((value-1) * PER_PAGE, value * PER_PAGE), page: value});
    };

    if (loading) {
        return <Box height={100}><Container sx={{height:'100%', display: 'flex', alignItems: 'center'}}><CircularProgress sx={{margin:'auto', display:'block'}}/></Container></Box>;
    }

    return( 
    <Box>        
        <CategoryCount pageStart={((page-1)*PER_PAGE)+1} pageLimit={PER_PAGE} categoryId={categoryId} />
        <Grid container spacing={1} sx={{paddingLeft: 2, mt: 2, paddingRight: 2}}>
        { products.map(product => {
            let offerPrice = product.prices.find(p => p.priceType === 'offerPrice').price;
            let listPrice = product.prices.find(p => p.priceType === 'listPrice').price;
            let salePercent = Math.floor(((listPrice - offerPrice ) * 100)/listPrice);
            let badgeContent = `-${salePercent}%`
            return (
            <Grid item xs={2}>
                <Badge invisible={listPrice===offerPrice} color='success' variant='string' badgeContent={badgeContent}>
                <Card sx={{':hover': { boxShadow: 20, cursor: 'pointer' }}} 
                     elevation={2}>
                    <Link component={RouterLink}  to='../p' state={{ productId: product.id }} color='inherit' underline='hover'>
                        <CardMedia component="img"
                        height="140"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRs1Un59AhvH-DBOKOf0cTDRDcf_m8gs1krICm49mb&s"
                    />
                    </Link>
                    <Link component={RouterLink} to='../p' state={{ productId: product.id }} color='inherit' underline='hover'>
                        <CardContent>
                            <Typography>{product.title}</Typography>
                            <Typography>{product.shortDescription}</Typography>
                            <Typography>{product.brand.name}</Typography>
                            <Typography variant='h6' color={listPrice !== offerPrice ? 'red' : 'black'}>${offerPrice}</Typography>
                            {listPrice !== offerPrice && <Typography variant='body2' color='grey' sx={{textDecoration: 'line-through'}}>${listPrice}</Typography>}
                        </CardContent>  
                    </Link>
                </Card>
                </Badge>
            </Grid>) 
        })}
        </Grid>
        <Pagination 
                    count={allProds.length%PER_PAGE > 0 ? Math.floor(allProds.length/PER_PAGE) + 1 : allProds.length/PER_PAGE} 
                    onChange={handlePageChange} />

    </Box>
    )
}

export default ProductGrid
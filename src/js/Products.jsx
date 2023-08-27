import { Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppBarWrapper from './AppBarWrapper';
import BrandFilter from './filters/BrandFilter';
import CategoryFilter from './filters/CategoryFilter';
import PriceSlider from './filters/PriceSlider';
import ProductGrid from './ProductGrid';

const Products = () => {
    const location = useLocation();
    const [state, setState] = useState({
        categoryId: location.state.categoryId,
        petType: location.state.petType,
        query: location.state.query,
        priceRange: [0,100],
        brand: {},
        selectedCategories: []
    });

    const {categoryId, petType, query, priceRange, brand, selectedCategories} = state;
    
    const setPriceRangeCallBack = useCallback((priceRange)=> {
        setState({...state, priceRange: priceRange});
        // eslint-disable-next-line
    }, []);

    const setBrandCallBack = useCallback((brand)=> {
        setState({...state, brand: brand});
        // eslint-disable-next-line
    }, []);
    
    const setSelectedCategoriesCallBack = useCallback((selectedCategories)=> {
        setState({...state, selectedCategories: selectedCategories});
        // eslint-disable-next-line
    }, []);
    
    return ( 
    <Box>        
        <AppBarWrapper page='s' pageProps={{state: {categoryId: categoryId}}} showSearch/>
        <Grid container spacing={1.5} sx={{paddingLeft: 2, mt: 1, paddingRight: 2}}> 
            <Grid item xs = {2} sx={{height:'100%'}}>
                <Typography variant='outlined'>CATEGORIES</Typography>
                <CategoryFilter categoryId={categoryId} selectedCategories={setSelectedCategoriesCallBack}/>
                <Divider />
                <Typography variant='outlined'>PRICE</Typography>
                <PriceSlider setPriceRange={setPriceRangeCallBack}/>
                <Divider />
                <Typography variant='outlined'>BRAND</Typography>
                <BrandFilter setBrand={setBrandCallBack}/>
            </Grid>
            <Grid item xs = {10}>
                <ProductGrid categoryId={categoryId} petType={petType} brandId={brand.id} query={query} priceRange={priceRange} />
            </Grid>
        </Grid>  
    </Box>
    )
};


export default Products;
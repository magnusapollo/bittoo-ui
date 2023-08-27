import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { memo } from "react";

const BrandFilter = memo(({setBrand}) => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        axios.get('/v1/brands').then((response) => {
            setBrands(response.data);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

    const handleChange = (event, brand) => {
        setBrand(brand);
    };
      
    return(
        <Box mt={1}>
        <FormGroup>
            {brands.map((b) => <FormControlLabel control={<Checkbox onChange={(e) => handleChange(e, b)} />} label={b.name} />)}
        </FormGroup>
        </Box>
    )
    

});

export default BrandFilter;
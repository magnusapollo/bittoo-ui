import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const axios = require('axios');
const CategoryCount = (props) => {
    const [total, setTotal] = useState();
    const [pageLimit, setPageLimit] = useState();

    useEffect(() => {
        axios.get(`/v1/products/totalInCategory?categoryId=`+props.categoryId).then((response) => {
            setTotal(response.data);
            setPageLimit(Math.min(total, props.pageLimit));
        }).catch((e) => {
            console.log(e);
        });
    });

    let end = props.pageStart + pageLimit - 1;
    end = Math.min(total, end);
    return <Box><Typography ml={2} variant="subtitle1">Showing {props.pageStart} - {end} of {total}</Typography></Box>
}

export default CategoryCount;
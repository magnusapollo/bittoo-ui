import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const axios = require('axios');
const SearchBar = ({showSearch}) => {
    let navigate = useNavigate();

    const [searchedItem, setSearchedItem] = useState();
    const [top100Products, setTop100Products] = useState([]);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            console.log('enter press here! ')
            
            navigate('../s', {state: {'query': event.target.value}});
        }
    }
    
    useEffect(() => {
        axios.get('/v1/items?limit=100').then((response) => {
            const items = [...new Set(response.data.map(item => item.title))];
            setTop100Products(items);
        }).catch((e) => {
            console.log(e);
        });
    }, []);
    
    if(!showSearch) return <Box sx={{ position: 'relative', flexGrow: 5 }}></Box>
    
    return <Autocomplete sx={{ position: 'relative', flexGrow: 5 }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={(e, newValue) => {
            console.log(newValue);
            setSearchedItem(newValue.id);
            console.log(searchedItem);
        }}
        options={top100Products}
        renderInput={(params) => (
            <TextField onKeyPress={handleSearch} sx={{ border: "solid", borderWidth: 1 }}
                {...params}
                label=""
                InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment: (<InputAdornment position="start"><SearchIcon htmlColor="white" /></InputAdornment>)
                }}
            />
        )}
    />
};


export default SearchBar;
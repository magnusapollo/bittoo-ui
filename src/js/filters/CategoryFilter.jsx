import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { memo } from "react";

const CategoryFilter = memo(({categoryId, selectedCategories}) => {
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        axios.get(`/v1/categories/${categoryId}`).then((response) => {
            setCategories(response.data.children);
        })
        .catch((e) => {
            console.log(e);
        })
    }, []);

    const handleChange = (event, category) => {
        if (event.target.checked) {
            setSelected([...selected, category]);
            selectedCategories([...selected, category]);
        } else {
            const newList = selected.filter((cat) => cat.id !== category.id);
            setSelected(newList);
            selectedCategories(newList);
        }
    };
      
    return(
        <Box mt={1}>
        <FormGroup>
            {categories.map((c) => <FormControlLabel control={<Checkbox onChange={(e) => handleChange(e, c)} />} label={c.title} />)}
        </FormGroup>
        </Box>
    )
    

});

export default CategoryFilter;
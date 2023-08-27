import { Slider } from "@mui/material";
import { memo, useState } from "react";

const PriceSlider = memo((props) => {
    const [priceRange, setPriceRange] = useState([0,100]);
    const minDistance = 10;
 
    const handlePriceChange = (
        event,
        newValue,
        activeThumb,
      ) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setPriceRange([clamped, clamped + minDistance]);
          } else {
            const clamped = Math.max(newValue[1], minDistance);
            setPriceRange([clamped - minDistance, clamped]);
          }
        } else {
            setPriceRange(newValue);
        }
    };

    const handlePriceChangeMouseUp = (
        event,
        newValue,
        activeThumb,
      ) => {
        if (!Array.isArray(newValue)) {
            return;
          }
        props.setPriceRange(newValue);
    };


    const marks = [
        {
          value: 0,
          label: '0',
        },
        {
          value: 100,
          label: '100',
        },
      ];

      return <Slider value={priceRange} onChange={handlePriceChange} onChangeCommitted={handlePriceChangeMouseUp} valueLabelDisplay='auto' marks={marks} disableSwap></Slider>
      
});

export default PriceSlider;
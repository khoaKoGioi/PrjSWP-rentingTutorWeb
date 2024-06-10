import React, { useState } from "react";
import { Slider } from "@nextui-org/react";

const PriceRangeSlider = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState([100, 500]);

  const handleChange = (value) => {
    setPriceRange(value);
    onChange(value);
  };

  return (
    <Slider
      label="Price Range / perhour"
      
      step={10}
      minValue={0}
      maxValue={100}
      defaultValue={[10, 50]}
      formatOptions={{ style: "currency", currency: "USD" }}
      className="max-w-md block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-inherit mb-4"
      onChange={handleChange}
    />
  );
};

export default PriceRangeSlider;

import React, { useState } from 'react'
import { Slider } from '@nextui-org/react'

const PriceRangeSlider = ({ onChange }) => {
  const [priceRange, setPriceRange] = useState([0, 5000])

  const handleChange = (value) => {
    setPriceRange(value)
    onChange(value)
  }

  return (
    <Slider
      label='Price Range / per hour'
      step={10}
      minValue={0}
      maxValue={5000}
      defaultValue={[0, 5000]}
      formatOptions={{ style: 'currency', currency: 'USD' }}
      className='max-w-md block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-inherit mb-4'
      onChange={handleChange}
    />
  )
}

export default PriceRangeSlider

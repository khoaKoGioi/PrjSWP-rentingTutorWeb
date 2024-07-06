import React from 'react'
import axios from 'axios'

const CheckoutPage = () => {
  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-payment')
      if (response.data && response.data.checkoutUrl) {
        window.location.href = response.data.checkoutUrl
      } else {
        console.error('No checkout URL returned')
      }
    } catch (error) {
      console.error('Error creating payment:', error)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <button onClick={handleClick} className='bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700'>
        Checkout
      </button>
    </div>
  )
}

export default CheckoutPage

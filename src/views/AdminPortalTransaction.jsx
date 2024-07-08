// AdminPortalTransaction.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'

const AdminPortalTransaction = () => {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getPayment')
        setPayments(response.data)
      } catch (error) {
        console.error('Error fetching payments:', error)
      }
    }
    fetchPayments()
  }, [])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPayments = payments.filter((payment) =>
    payment.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='mx-auto p-6 bg-gray-100 min-h-screen'>
      <header className='bg-purple-600 text-white shadow-md py-4'>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-4xl font-bold mb-6 text-center text-black'>Admin Portal - Payments</h1>
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            className='border border-gray-400 p-2 rounded-lg flex-grow max-w-xl focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Search by order code'
          />
        </div>
        <table className='mx-auto min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-t from-yellow-700 to-yellow-300 text-black'>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>Tutor ID</th>
              <th className='p-4 text-left'>Order Code</th>
              <th className='p-4 text-left'>Amount</th>
              <th className='p-4 text-left'>Status</th>
              <th className='p-4 text-left'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr key={payment.id} className='border-b hover:bg-purple-50'>
                <td className='p-4'>{index + 1}</td>
                <td className='p-4'>{payment.tutorID}</td>
                <td className='p-4'>{payment.orderCode}</td>
                <td className='p-4'>{payment.amount}</td>
                <td className='p-4'>{payment.status}</td>
                <td className='p-4'>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPortalTransaction

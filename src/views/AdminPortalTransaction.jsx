// AdminPortalTransaction.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Grid, styled, useTheme } from "@mui/material";
import DoughnutChart from '../components/Doughnut.jsx';
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import StatCards2 from '../components/StatCards.jsx';
import LineChart from '../components/LineChart.jsx';
const AdminPortalTransaction = () => {
  const [payments, setPayments] = useState([])
  const { palette } = useTheme();

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

  return (
    <div className='mx-auto p-6 bg-gray-100 min-h-screen'>
      <header className='bg-purple-600 text-white shadow-md py-4'>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
       <h1 className='text-4xl font-bold mb-6 text-center text-black'>Admin Portal - Revenue</h1> 
      <Grid container spacing={3}>
        
        <Grid item lg={8} md={8} sm={12} xs={12}>
          
          <StatCards2/>
          
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
              {payments.map((payment, index) => (
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
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
             Traffic Sources
              Last 30 days

              <DoughnutChart
                height="300px"
                color={['#ff6384', '#36a2eb', '#cc65fe']}
              />
            </Card>
        <LineChart
          height="300px"
          
          color={['#ff6384', '#36a2eb']}
        />       
        </Grid>     

      </Grid>      
      </div>
    </div>
  )
}

export default AdminPortalTransaction

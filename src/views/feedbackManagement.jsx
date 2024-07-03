import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, CardBody, Typography, Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/feedbacks')
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error)
    }
  }

  const handleViewClick = (id) => {
    navigate(`/classDetail/${id}`)
  }

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://6676c5c6145714a1bd72bec9.mockapi.io/swp/feedbacks/${id}`)
      fetchFeedbacks()
    } catch (error) {
      console.error('Failed to delete feedback:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='container mx-auto p-4'>
        <Typography variant='h2' className='mb-4 text-center'>
          Feedback List
        </Typography>
        <div className='grid gap-4'>
          {feedbacks.map((feedback) => (
            <Card key={feedback.id} className='shadow-lg mb-4'>
              <CardBody className='flex justify-between items-center'>
                <div>
                  <Typography variant='h5' className='mb-2'>
                    {feedback.className}
                  </Typography>
                  <Typography variant='body1' className='mb-2'>
                    {feedback.message}
                  </Typography>
                  <Typography tag='h3' className='text-gray-500'>
                    Student ID: {feedback.studentID}
                  </Typography>
                </div>
                <div className='flex items-center'>
                  <Button className='w-50 mr-4' onClick={() => handleViewClick(feedback.classId)}>
                    View
                  </Button>
                  <Button className='w-50' color='red' onClick={() => handleDeleteClick(feedback.id)}>
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeedbackManagement

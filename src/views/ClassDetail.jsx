import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons'
import { CircularImg } from '../components/CircularImg.jsx'
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx'
import MegaMenuWithHover from '../components/MegaMenuWithHover.jsx'

const ClassDetail = () => {
  const location = useLocation()
  const {
    classID,
    className,
    subject,
    length,
    type,
    description,
    tutorID,
    tutorFullName,
    rating,
    price,
    videoLink,
    available
  } = location.state || {}
  const [showVideo, setShowVideo] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    if (classID) {
      fetchFeedbacks()
      checkEnrollmentStatus()
    }
  }, [classID])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`https://6676c5c6145714a1bd72bec9.mockapi.io/swp/feedbacks?classId=${id}`)
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    }
  }

  const checkEnrollmentStatus = async () => {
    try {
      const response = await axios.get(`https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class/${id}`)
      setIsEnrolled(response.data.isEnrolled)
    } catch (error) {
      console.error('Error fetching class data:', error)
    }
  }

  const handleEnrollNow = async () => {
    try {
      await axios.put(`https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class/${id}`, {
        isEnrolled: true
      })
      setIsEnrolled(true)
    } catch (error) {
      console.error('Error enrolling in class:', error)
    }
  }

  const handleGiveFeedback = () => {
    setShowFeedbackForm(true)
  }

  const handleSaveFeedback = async () => {
    try {
      const response = await axios.post('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/feedbacks', {
        classId: classID,
        message: feedbackMessage,
        studentAvatar: '', // Assuming avatar info can be included if available
        studentName: '', // Assuming student name can be included if available
        date: new Date().toISOString(),
        isEnrolled: true // Automatically set isEnrolled to true for enrolled students
      })
      setFeedbacks([...feedbacks, response.data])
      setFeedbackMessage('')
      setShowFeedbackForm(false)
    } catch (error) {
      console.error('Error saving feedback:', error)
    }
  }

  const handleCloseFeedbackForm = () => {
    setShowFeedbackForm(false)
  }

  const handleCloseVideo = () => {
    setShowVideo(false)
  }

  const getYoutubeThumbnail = (url) => {
    if (!url) {
      return '' // Handle undefined or null case
    }

    const videoId = url.split('v=')[1]
    if (!videoId) {
      return '' // Handle invalid video URL
    }

    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      return `https://img.youtube.com/vi/${videoId.substring(0, ampersandPosition)}/0.jpg`
    }
    return `https://img.youtube.com/vi/${videoId}/0.jpg`
  }

  if (!classID) {
    return <div>Loading...</div> // Render a loading state or redirect if classID is not available
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <header>
        <MegaMenuWithHover />
      </header>

      <div className='container mx-auto pl-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col pt-16'>
          <BreadcrumbsWithIcon pathnames={['Home', 'ClassList', `ClassDetail ${classID}`]} />
        </div>
      </div>

      <div className='container mx-auto p-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col gap-4'>
          <Card className='shadow-lg w-full'>
            <CardBody className='flex flex-col md:flex-row items-start md:items-center gap-5 p-6'>
              <div className='w-full md:w-1/2'>
                <div className='relative cursor-pointer' onClick={() => setShowVideo(true)}>
                  <img
                    src={getYoutubeThumbnail(videoLink)}
                    alt='Video Thumbnail'
                    className='w-full h-auto rounded-lg'
                  />
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <FontAwesomeIcon
                      icon={faPlay}
                      className='h-16 w-16 text-white opacity-75 cursor-pointer hover:opacity-100'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/2'>
                <Typography variant='h4' className='mb-4'>
                  {className}
                </Typography>
                <Typography variant='body1' className='mb-4' style={{ wordWrap: 'break-word' }}>
                  {description}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Tutor:</strong> {tutorFullName}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Subject:</strong> {subject}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Rating of tutor:</strong> {rating}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Last for:</strong> {length}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Available:</strong> {available}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Type:</strong> {type}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Price:</strong> ${price}
                </Typography>
                <div className='flex gap-4'>
                  <Button className='w-50' onClick={handleEnrollNow} disabled={isEnrolled || showFeedbackForm}>
                    {isEnrolled ? 'Enrolled' : 'Enroll now'}
                  </Button>
                  {isEnrolled && (
                    <Button className='w-50' onClick={showFeedbackForm ? handleCloseFeedbackForm : handleGiveFeedback}>
                      {showFeedbackForm ? 'Close' : 'Give feedback'}
                    </Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {showFeedbackForm && (
            <Card className='shadow-lg w-full mt-4'>
              <CardBody>
                <textarea
                  className='border border-gray-300 rounded-md p-2 w-full mb-2'
                  placeholder='Write your feedback...'
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                />
                <Button onClick={handleSaveFeedback} className='ml-2'>
                  Save
                </Button>
              </CardBody>
            </Card>
          )}

          <Card className='shadow-lg w-full mt-4'>
            <CardBody>
              <Typography variant='h3' className='mb-2'>
                All reviews
              </Typography>
              {feedbacks.map((feedback, index) => (
                <Card key={index} className='p-3 mb-3'>
                  <div className='flex items-center mb-2'>
                    <CircularImg avatar={feedback.studentAvatar} />
                    <div className='ml-2'>
                      <Typography variant='body1'>{feedback.studentName}</Typography>
                      <Typography variant='body2' className='text-gray-500'>
                        {new Date(feedback.date).toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant='body1'>{feedback.message}</Typography>
                </Card>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {showVideo && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
          <div className='relative w-full h-full max-w-screen-lg'>
            <div className='absolute top-48 right-48 m-4 cursor-pointer text-white z-10'>
              <FontAwesomeIcon icon={faTimes} className='h-8 w-8' onClick={handleCloseVideo} />
            </div>
            <iframe
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${videoLink.split('v=')[1]}`}
              title='YouTube Video Player'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassDetail

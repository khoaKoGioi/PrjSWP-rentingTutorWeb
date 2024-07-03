import React, { useState, useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStar, faStarHalfAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { CircularImg } from '../components/CircularImg.jsx'
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx'
import MegaMenuWithHover from '../components/MegaMenuWithHover.jsx'

const ClassDetail = () => {
  const { id } = useParams()
  const [showVideo, setShowVideo] = useState(false)
  const [classData, setClassData] = useState([])
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbacks, setFeedbacks] = useState([])
  const [enrollError, setEnrollError] = useState('')

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/getClass/${id}`)
        const classDetails = response.data.data // Assuming API response contains all required fields
        setClassData(classDetails)
      } catch (error) {
        console.log(error)
      }
    }

    fetchClass()
  }, [])

  useEffect(() => {
    if (id) {
      checkEnrollmentStatus()
      fetchFeedbacks()
    }
  }, [id])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`https://6676c5c6145714a1bd72bec9.mockapi.io/swp/feedbacks?classId=`)
      setFeedbacks(response.data)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    }
  }

  const checkEnrollmentStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/checkEnroll/${id}`)
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('User is not logged in')
        return
      }
      const decodedToken = jwtDecode(token)
      if (decodedToken.user.role == 'Student') {
        const studentID = decodedToken.user.studentID
        if (studentID == response.data.studentID) {
          setIsEnrolled(response.data.status)
        } else {
          setIsEnrolled(false)
        }
        setEnrollError('')
      }
    } catch (error) {
      console.error('Error fetching class data:', error)
    }
  }

  const handleEnrollNow = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setEnrollError('User is not logged in')
        return
      }
      const decodedToken = jwtDecode(token)
      if (decodedToken.user.role == 'Student') {
        const studentID = decodedToken.user.studentID
        await axios.post(`http://localhost:5000/api/students/enrollClass/${classData.classID}`, {
          studentID
        })
        setIsEnrolled(true)
        setEnrollError('')
      } else if (decodedToken.user.role == 'Tutor') {
        const tutorId = decodedToken.user.tutorID
        if (tutorId == classData.tutorID) {
          setEnrollError('You are the tutor of this class!')
        } else {
          setEnrollError('You are not a student!')
        }
      } else {
        setEnrollError('User is not a student')
      }
    } catch (error) {
      console.error('Error enrolling in class:', error)
      setEnrollError(error.response.data.message || 'Failed to enroll in class. Please try again.')
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

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className='text-yellow-400' />)
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key='half' icon={faStarHalfAlt} className='text-yellow-400' />)
    }

    return stars
  }

  if (!id) {
    return <div>Loading...</div> // Render a loading state or redirect if classID is not available
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <header>
        <MegaMenuWithHover />
      </header>

      <div className='container mx-auto pl-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col pt-16'>
          <BreadcrumbsWithIcon pathnames={['Home', 'ClassList', `Class ${classData.classID}`]} />
        </div>
      </div>

      <div className='container mx-auto p-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col gap-4'>
          <Card className='shadow-lg w-full'>
            <CardBody className='flex flex-col md:flex-row items-start md:items-center gap-5 p-6'>
              <div className='w-full md:w-1/2'>
                <div className='relative cursor-pointer' onClick={() => setShowVideo(true)}>
                  <img
                    src={getYoutubeThumbnail(classData.videoLink)}
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
                  {classData.className}
                </Typography>
                <Typography variant='body1' className='mb-4' style={{ wordWrap: 'break-word' }}>
                  {classData.description}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <Link to={`/tutor-profile/${classData.userID}`} className='block'>
                    <strong>Tutor:</strong> {classData.tutorFullName}
                  </Link>
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Subject:</strong> {classData.subject}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Rating of tutor:</strong> {renderStars(classData.rating)}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Last for:</strong> {classData.length}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Available:</strong> {classData.available}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Type:</strong> {classData.type}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Price:</strong> ${classData.price}
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
                {enrollError && (
                  <Typography variant='body2' className='text-red-600 mt-2'>
                    {enrollError}
                  </Typography>
                )}
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
              src={`https://www.youtube.com/embed/${classData.videoLink.split('v=')[1]}`}
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

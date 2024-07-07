import React, { useEffect, useState, useRef } from 'react'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import { FaStar, FaUser, FaBook, FaCertificate, FaInfoCircle } from 'react-icons/fa'
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx' // Adjust path as per your project structure
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChatBox from '../components/ChatBox.jsx'

const ViewTutorProfile = () => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [tutor, setTutor] = useState([])
  const [user, setUser] = useState([])
  const [isRequestOpen, setRequestOpen] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')
  const chatBoxRef = useRef() // Reference to the ChatBox component

  useEffect(() => {
    if (id) {
      fetchTutor()
    }
    if (token) {
      const decodedToken = jwtDecode(token)
      setUser(decodedToken.user)
    }
  }, [id])

  const fetchTutor = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/getTutor/${id}`)
      setTutor(response.data.data) // Assuming the API response contains the tutor data in `data` field
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching tutor data:', error)
    }
  }

  const handleRequestClick = () => {
    setRequestOpen(!isRequestOpen)
  }

  const handleRequestChange = (e) => {
    setRequestMessage(e.target.value)
  }

  const handleSendRequest = async () => {
    if (role != 'Student' || user.role != 'Student') {
      toast.error('You are not a student!')
    } else {
      if (!requestMessage) {
        toast.error('You cannot send a blank message!')
        return
      }
      try {
        const response = await axios.post(`http://localhost:5000/api/students/requestClass/${tutor.tutorID}`, {
          studentID: user.studentID,
          message: requestMessage
        })
        toast.info('Request message sent!')

        // Send the request message to the ChatBox
        await chatBoxRef.current.sendMessage(requestMessage, tutor)

        // Close the request box after sending the message
        setRequestOpen(false)
        setRequestMessage('')
      } catch (error) {
        console.error('Error sending request message:', error)
      }
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='container mx-auto pt-16 '>
        <header>
          <MegaMenuWithHover />
        </header>
      </div>
      <div className='container mx-auto pl-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col'>
          <BreadcrumbsWithIcon
            pathnames={['Home', 'ClassList', `ClassDetail`, tutor.fullName]} // Update pathnames as per your breadcrumb requirements
          />
        </div>
      </div>
      <div className='flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto'>
        <div className='font-extrabold bg-gradient-to-r mb-7 from-orange-500 to-orange-800 bg-clip-text text-transparent text-2xl py-5'>
          {/*eslint-disable-next-line react/no-unescaped-entities */}
          {tutor.fullName}'s Profile
        </div>
        <div className='flex items-center w-full mb-4'>
          <div className='w-32 h-32 flex-shrink-0'>
            <img
              className='rounded-full w-full h-full object-cover'
              src={
                tutor.avatar
                  ? tutor.avatar
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5Ubik9ZId9O2iIKuSPD5ZSS6ef7UzZ04UQ&s'
              }
              alt='Tutor Avatar'
            />
          </div>
          <div className='ml-6 flex-1'>
            <div className='mb-4'>
              <h2 className='flex items-center'>
                <FaUser className='mr-2 text-gray-600' /> {tutor.fullName}
              </h2>
            </div>
            <div className='mb-4 flex items-center'>
              <FaInfoCircle className='mr-2 text-gray-600' />
              <p>{tutor.description}</p>
            </div>
            <div className='mb-4 flex items-center'>
              <FaBook className='mr-2 text-gray-600' />
              <p>{tutor.subjects}</p>
            </div>
            <div className='mb-4 flex items-center'>
              <FaCertificate className='mr-2 text-gray-600' />
              <div className='flex-shrink-0'>
                <img
                  src={tutor.degrees}
                  alt='Tutor Degrees'
                  className='object-contain max-w-full max-h-32' // Adjust max-h to control the height
                  style={{ maxWidth: '100%', maxHeight: '8rem' }} // Inline style for more control
                />
              </div>
            </div>
            <div className='mb-4 flex items-center'>
              <FaStar className='mr-2 text-yellow-600' />
              <p>{tutor.rating || 'No rating'} / 5</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleRequestClick}
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-300 mb-4'
        >
          Send Request
        </button>
        {isRequestOpen && (
          <div className='w-full'>
            <textarea
              value={requestMessage}
              onChange={handleRequestChange}
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-4'
              rows='3'
              placeholder='Write your request here...'
            />
            <button
              onClick={handleSendRequest}
              className='w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 transition duration-300'
            >
              Send
            </button>
          </div>
        )}
      </div>
      <ChatBox ref={chatBoxRef} /> {/* Add ref to ChatBox */}
      <ToastContainer />
    </div>
  )
}

export default ViewTutorProfile

import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import AuthContext from '../contexts/JWTAuthContext' // Import AuthContext
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AccessDeniedPage from '../components/AccessDeniedPage.jsx'

const apiBaseUrl = 'http://localhost:5000/api/tutors'

const ClassManagement = () => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [classes, setClasses] = useState([])
  const [inactiveClasses, setInactiveClasses] = useState([])
  const [formData, setFormData] = useState({
    videoLink: '',
    className: '',
    tutorID: '',
    description: '',
    price: '',
    subject: '',
    PaymentID: 0,
    length: '',
    available: '',
    type: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [updateFormData, setUpdateFormData] = useState(formData)
  const [currentClassId, setCurrentClassId] = useState(null)

  useEffect(() => {
    if (token && role == 'Tutor') {
      fetchClasses()
    }
  }, [token, role])

  if (!token || !role || role == 'Student') {
    return <AccessDeniedPage />
  }

  const fetchClasses = async () => {
    try {
      if (!token) {
        toast.error('User is not logged in')
        return
      }
      const decodedToken = jwtDecode(token)
      const tutorID = decodedToken.user.tutorID
      const response = await axios.post(`${apiBaseUrl}/findClasses/${tutorID}`)
      const activeClasses = response.data.classroom.filter((classroom) => classroom.isActive)
      const inactiveClasses = response.data.classroom.filter((classroom) => classroom.isActive == 0)
      setClasses(activeClasses)
      setInactiveClasses(inactiveClasses)
    } catch (error) {
      console.error('Error fetching classes:', error)
    }
  }

  const handleDeactivateClass = async (classID) => {
    try {
      await axios.delete(`${apiBaseUrl}/deleteClasses/${classID}`)
      toast('Class deactivate successfully!')
      fetchClasses()
    } catch (error) {
      console.error('Error deleting class:', error)
      toast.error('There was an error deactivating the class.')
    }
  }

  const handleActivateClass = async (classID) => {
    try {
      await axios.put(`${apiBaseUrl}/activeClasses/${classID}`)
      toast('Class activate successfully!')
      fetchClasses()
    } catch (error) {
      console.error('Error deleting class:', error)
      toast.error('There was an error activating the class.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const numericValue = name === 'PaymentID' && value !== '' ? parseInt(value, 10) : value
    setFormData({
      ...formData,
      [name]: numericValue
    })
  }

  const handleUpdateChange = (e) => {
    const { name, value } = e.target
    const numericValue = name === 'PaymentID' && value !== '' ? parseInt(value, 10) : value
    setUpdateFormData({
      ...updateFormData,
      [name]: numericValue
    })
  }

  const validateForm = (data) => {
    const requiredFields = [
      'videoLink',
      'className',
      'subject',
      'description',
      'available',
      'length',
      'PaymentID',
      'type',
      'price'
    ]
    for (const field of requiredFields) {
      if (!data[field]) {
        if (field == 'PaymentID') return `Please fill in the Subcription field.`
        return `Please fill in the ${field} field.`
      }
    }
    return null
  }

  const handleAddClass = async () => {
    try {
      //alert
      const validationError = validateForm(formData)
      if (validationError) {
        toast.error(validationError)
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        console.error('User is not logged in')
        return
      }
      const decodedToken = jwtDecode(token)
      const tutorID = decodedToken.user.tutorID
      formData.tutorID = tutorID
      const response = await axios.post(`${apiBaseUrl}/createClasses`, formData)
      setClasses([...classes, response.data])
      setFormData({
        videoLink: '',
        className: '',
        tutorID: '',
        description: '',
        price: '',
        subject: '',
        PaymentID: 0,
        length: '',
        available: '',
        type: ''
      })
      setIsModalOpen(false)
      toast.info('Class created successfully!')
      console.log(response.data)
      fetchClasses()
    } catch (error) {
      console.error('Error adding class:', error)
      toast.error('There was an error creating the class.')
    }
  }

  const handleOpenUpdateModal = (cls) => {
    setCurrentClassId(cls.classID)
    setUpdateFormData({
      videoLink: cls.videoLink,
      className: cls.className,
      tutorID: cls.tutorID,
      description: cls.description,
      price: cls.price,
      subject: cls.subject,
      PaymentID: cls.paymentID,
      length: cls.length,
      available: cls.available,
      type: cls.type === 'Online' ? 'Online' : 'Offline'
    })
    setIsUpdateModalOpen(true)
  }

  const handleUpdateClass = async () => {
    try {
      const validationError = validateForm(updateFormData)
      if (validationError) {
        toast.error(validationError)
        return
      }

      const response = await axios.post(`${apiBaseUrl}/updateClasses/${currentClassId}`, updateFormData)
      setClasses(classes.map((cls) => (cls.id === currentClassId ? response.data : cls)))
      setIsUpdateModalOpen(false)
      toast.info('Class updated successfully!')
      fetchClasses()
    } catch (error) {
      console.error('Error updating class:', error)
      toast.error('There was an error updating the class.')
    }
  }

  return (
    <div className='container mx-auto p-4 pt-16'>
      <header>
        <MegaMenuWithHover />
      </header>
      <div className='mx-auto mt-10'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Class Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-4'
        >
          Add New Class
        </button>
        <div className='grid grid-cols-1 gap-4'>
          {classes.map((cls) => (
            <div key={cls.classID} className='flex justify-between items-center p-4 border rounded shadow'>
              <div>
                <h2 className='text-lg font-bold'>{cls.className}</h2>
                <p className='text-sm'>Subject: {cls.subject}</p>
              </div>
              <div>
                <button
                  onClick={() => handleOpenUpdateModal(cls)}
                  className='bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeactivateClass(cls.classID)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700'
                >
                  Deactivate
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className='text-xl font-bold mb-4 mt-8 text-center'>Inactive Classes</h2>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          {inactiveClasses.map((cls) => (
            <div key={cls.classID} className='flex justify-between items-center p-4 border rounded shadow'>
              <div>
                <h2 className='text-lg font-bold'>{cls.className}</h2>
                <p className='text-sm'>Subject: {cls.subject}</p>
              </div>
              <div>
                <button
                  onClick={() => handleActivateClass(cls.classID)}
                  className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700'
                >
                  Activate
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded shadow-lg w-1/2 max-h-[80vh] overflow-y-auto mt-20'>
              <h2 className='text-xl font-bold mb-4 text-center'>Add New Class</h2>
              <div className='mb-4'>
                <label className='block mb-2'>Video link</label>
                <input
                  type='text'
                  name='videoLink'
                  value={formData.videoLink}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Class name</label>
                <input
                  type='text'
                  name='className'
                  value={formData.className}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Subject included</label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Description</label>
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Available on</label>
                <input
                  type='text'
                  name='available'
                  value={formData.available}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Length</label>
                <input
                  type='text'
                  name='length'
                  value={formData.length}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Subscription type:</label>
                <p className='text-sm text-gray-600'>
                  Before choosing the type of subscription, go to our Home Page and scroll down to have a look at the
                  subscription choices.
                </p>
                <select
                  name='PaymentID'
                  value={formData.PaymentID}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  <option value={0} disabled>
                    Select subscription type:
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block mb-2'>Type (Online or Offline)</label>
                <select
                  name='type'
                  value={formData.type}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  <option value='' disabled>
                    Select teaching method:
                  </option>
                  <option value='1'>Online</option>
                  <option value='2'>Offline</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <button onClick={handleAddClass} className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mr-2'>
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isUpdateModalOpen && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded shadow-lg w-1/2 max-h-[80vh] overflow-y-auto mt-20'>
              <h2 className='text-xl font-bold mb-4'>Update Class</h2>
              <div className='mb-4'>
                <label className='block mb-2'>Video link</label>
                <input
                  type='text'
                  name='videoLink'
                  value={updateFormData.videoLink}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Class name</label>
                <input
                  type='text'
                  name='className'
                  value={updateFormData.className}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Subject included</label>
                <input
                  type='text'
                  name='subject'
                  value={updateFormData.subject}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Description</label>
                <textarea
                  name='description'
                  value={updateFormData.description}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Available on</label>
                <input
                  type='text'
                  name='available'
                  value={updateFormData.available}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Length</label>
                <input
                  type='text'
                  name='length'
                  value={updateFormData.length}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Subscription type:</label>
                <select
                  name='PaymentID'
                  value={updateFormData.PaymentID}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  <option value='0' disabled>
                    Select subscription type:
                  </option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                </select>
              </div>

              <div className='mb-4'>
                <label className='block mb-2'>Type (Online/Offline)</label>
                <select
                  name='type'
                  value={updateFormData.type}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                >
                  <option value='' disabled>
                    Select Type
                  </option>
                  <option value='Online'>Online</option>
                  <option value='Offline'>Offline</option>
                </select>
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Price</label>
                <input
                  type='number'
                  name='price'
                  value={updateFormData.price}
                  onChange={handleUpdateChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <button
                onClick={handleUpdateClass}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2'
              >
                Save
              </button>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default ClassManagement

import React, { useState, useContext, useEffect, useRef } from 'react'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import {
  FaEnvelope,
  FaPhone,
  FaSchool,
  FaBirthdayCake,
  FaGraduationCap,
  FaUser,
  FaRegEdit,
  FaRegAddressCard,
  FaRegUser,
  FaStar,
  FaFileAlt,
  FaBriefcase
} from 'react-icons/fa'
import AuthContext from '../contexts/JWTAuthContext'

const UserProfile = () => {
  const { user } = useContext(AuthContext)
  const [userData, setUserData] = useState({})
  console.log(userData)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/update/${user.userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
      const data = await response.json()

      localStorage.setItem('token', data.token)
      setUserData(data.user)
      alert('Profile updated successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUserData((prevData) => ({
          ...prevData,
          avatar: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const renderRatingStars = () => {
    const rating = parseFloat(userData.rating) || 0
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const totalStars = 5

    return (
      <div className='flex'>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className='text-yellow-500' />
        ))}
        {hasHalfStar && <FaStarHalfAlt className='text-yellow-500' />}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <FaStar key={index} className='text-gray-400' />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className='container mx-auto p-4 pt-16'>
        <header>
          <MegaMenuWithHover />
        </header>
      </div>
      <div className='flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto my-5'>
        <div className='font-extrabold bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent text-2xl py-5'>
          {userData.name || userData.userName}'s Profile
        </div>
        <div className='flex items-center w-full mb-4'>
          <div className='avatar-container w-24 h-24 flex-shrink-0 relative cursor-pointer' onClick={handleAvatarClick}>
            <img
              className='avatar-image rounded-full w-full h-full object-cover'
              src={
                userData.avatar ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRCdGAc11Bt-rpmGh5q0ESuFgEkDLBUhNOMA&s'
              } // Provide a default avatar if none is set
              alt='User Avatar'
            />
            <div className='avatar-overlay absolute inset-0 bg-black opacity-50 flex justify-center items-center rounded-full'>
              <FaRegEdit className='edit-icon text-white' />
            </div>
          </div>
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept='image/*'
            onChange={handleFileChange}
          />
          <div className='ml-6 flex-1'>
            <div className='flex items-center'>
              <FaUser className='mr-2 text-gray-600' />
              <label className='flex-1'>
                <span className='block text-sm font-medium text-gray-700'>Username</span>
                <input
                  type='text'
                  name='username'
                  value={userData.userName || ''}
                  onChange={handleChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                />
              </label>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center mb-4'>
            <FaRegUser className='mr-2 text-gray-600' />
            <label className='flex-1'>
              <span className='block text-sm font-medium text-gray-700'>Full Name</span>
              <input
                type='text'
                name='fullName'
                value={userData.fullName || ''}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
              />
            </label>
          </div>
          <div className='flex items-center mb-4'>
            <FaEnvelope className='mr-2 text-gray-600' />
            <label className='flex-1'>
              <span className='block text-sm font-medium text-gray-700'>Email</span>
              <input
                type='email'
                name='email'
                value={userData.email || ''}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
              />
            </label>
          </div>
          <div className='flex items-center mb-4'>
            <FaPhone className='mr-2 text-gray-600' />
            <label className='flex-1'>
              <span className='block text-sm font-medium text-gray-700'>Phone Number</span>
              <input
                type='text'
                name='phone'
                value={userData.phone || ''}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
              />
            </label>
          </div>
          <div className='flex items-center mb-4'>
            <FaRegAddressCard className='mr-2 text-gray-600' />
            <label className='flex-1'>
              <span className='block text-sm font-medium text-gray-700'>Address</span>
              <input
                type='text'
                name='address'
                value={userData.address || ''}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
              />
            </label>
          </div>
          <div className='flex items-center mb-4'>
            <FaBirthdayCake className='mr-2 text-gray-600' />
            <label className='flex-1'>
              <span className='block text-sm font-medium text-gray-700'>Date of Birth</span>
              <input
                type='date'
                name='dob'
                value={formatDate(userData.dateOfBirth) || ''}
                onChange={handleChange}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
              />
            </label>
          </div>
          {userData.role === 'Student' && (
            <>
              <div className='flex items-center mb-4'>
                <FaSchool className='mr-2 text-gray-600' />
                <label className='flex-1'>
                  <span className='block text-sm font-medium text-gray-700'>School</span>
                  <input
                    type='text'
                    name='school'
                    value={userData.school || ''}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                  />
                </label>
              </div>
              <div className='flex items-center mb-4'>
                <FaGraduationCap className='mr-2 text-gray-600' />
                <label className='flex-1'>
                  <span className='block text-sm font-medium text-gray-700'>Grade</span>
                  <input
                    type='text'
                    name='grade'
                    value={userData.grade || ''}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                  />
                </label>
              </div>
            </>
          )}
          {userData.role === 'Tutor' && (
            <>
              <div className='flex items-center mb-4'>
                <FaBriefcase className='mr-2 text-gray-600' />
                <label className='flex-1'>
                  <span className='block text-sm font-medium text-gray-700'>Workplace</span>
                  <input
                    type='text'
                    name='workplace'
                    value={userData.workplace || ''}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                  />
                </label>
              </div>
              <div className='flex items-center mb-4'>
                <FaFileAlt className='mr-2 text-gray-600' />
                <label className='flex-1'>
                  <span className='block text-sm font-medium text-gray-700'>Description</span>
                  <textarea
                    name='description'
                    value={userData.description || ''}
                    onChange={handleChange}
                    className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                  />
                </label>
              </div>
              <div className='flex flex-col mb-4'>
                <div className='flex items-center'>
                  <FaStar className='mr-2 text-gray-600' />
                  <span className='block text-sm font-medium text-gray-700'>Rating</span>
                </div>
                <div className='mt-1'>{renderRatingStars()}</div>
              </div>
              <div className='flex flex-col mb-4'>
                <div className='flex items-center'>
                  <FaFileAlt className='mr-2 text-gray-600' />
                  <span className='block text-sm font-medium text-gray-700'>Degrees</span>
                </div>
                <img
                  src={userData.degrees || null}
                  alt='Degrees'
                  className='mt-1 w-full h-auto max-h-60 object-cover border border-gray-300 rounded-md shadow-sm'
                />
              </div>
            </>
          )}
          <button
            onClick={handleUpdate}
            className='w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-300'
          >
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

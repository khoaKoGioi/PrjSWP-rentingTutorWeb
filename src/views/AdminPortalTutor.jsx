import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import AccessDeniedPage from '../components/AccessDeniedPage.jsx'

const AdminPortalTutor = () => {
  const [tutors, setTutors] = useState([])
  const [allTutors, setAllTutors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const role = localStorage.getItem('role')
  if (role != 'Admin') {
    return <AccessDeniedPage />
  }

  useEffect(() => {
    // Fetch tutors from the API
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    axios
      .get('http://localhost:5000/api/admin/getUser')
      .then((response) => {
        const tutorData = response.data.data.filter((user) => user.role === 'Tutor')
        setTutors(tutorData)
        setAllTutors(tutorData)
      })
      .catch((error) => {
        console.error('Error fetching tutors:', error)
      })
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.trim() !== '') {
      const filteredTutors = allTutors.filter(
        (tutor) => tutor.userName && tutor.userName.toLowerCase().includes(value.toLowerCase())
      )
      setTutors(filteredTutors)
    } else {
      // Reset tutors list if search term is empty
      setTutors(allTutors)
    }
  }

  const toggleActiveStatus = (id, isActive) => {
    // Update tutor's active status
    const newStatus = isActive ? 0 : 1
    const apiUrl = isActive
      ? `http://localhost:5000/api/admin/banUsers/${id}`
      : `http://localhost:5000/api/admin/unbanUsers/${id}`
    axios
      .put(apiUrl)
      .then((response) => {
        setTutors(tutors.map((tutor) => (tutor.id === id ? { ...tutor, active: newStatus } : tutor)))
        fetchClasses()
      })
      .catch((error) => {
        console.error('Error updating tutor status:', error)
      })
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  return (
    <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
      <header className='bg-purple-600 text-white shadow-md py-4'>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-4xl font-bold mb-6 text-center text-black'>Admin Portal - Tutors</h1>
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            className='border border-gray-400 p-2 rounded-lg flex-grow max-w-xl focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Search by tutor name'
          />
        </div>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-t from-yellow-700 to-yellow-300 text-black'>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>Username</th>
              <th className='p-4 text-left'>Fullname</th>
              <th className='p-4 text-left'>Email</th>
              <th className='p-4 text-left'>Date Of Birth</th>
              <th className='p-4 text-left'>Role</th>
              <th className='p-4 text-left'>Phone</th>
              <th className='p-4 text-left'>Address</th>
              <th className='p-4 text-left'>Active</th>
              <th className='p-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor, index) => (
              <tr key={tutor.userID} className='border-b hover:bg-purple-50'>
                <td className='p-4'>{index + 1}</td>
                <td className='p-4'>{tutor.userName}</td>
                <td className='p-4'>{tutor.fullName}</td>
                <td className='p-4'>{tutor.email}</td>
                <td className='p-4'>{formatDate(tutor.dateOfBirth)}</td>
                <td className='p-4'>{tutor.role}</td>
                <td className='p-4'>{tutor.phone}</td>
                <td className='p-4'>{tutor.address}</td>
                <td className='p-4'>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      tutor.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {tutor.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className='p-4'>
                  <button
                    onClick={() => toggleActiveStatus(tutor.userID, tutor.active)}
                    className={`p-2 rounded-lg ${tutor.active ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    {tutor.active ? 'Ban' : 'Unban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPortalTutor

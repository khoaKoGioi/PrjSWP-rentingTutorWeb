import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import AccessDeniedPage from '../components/AccessDeniedPage.jsx'

const AdminPortalClass = () => {
  const [classes, setClasses] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const role = localStorage.getItem('role')
  if (role != 'Admin') {
    return <AccessDeniedPage />
  }

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    axios
      .get('http://localhost:5000/api/admin/classListExisted')
      .then((response) => {
        setClasses(response.data.data)
        setAllClasses(response.data.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching classes:', error)
      })
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.trim() !== '') {
      const filteredClasses = allClasses.filter((classItem) =>
        classItem.className.toLowerCase().includes(value.toLowerCase())
      )
      setClasses(filteredClasses)
    } else {
      // Reset classes list if search term is empty
      setClasses(allClasses)
    }
  }

  const deleteClass = (id) => {
    // Delete class
    axios
      .delete(`http://localhost:5000/api/admin/deleteClass/${id}`)
      .then((response) => {
        setClasses(classes.filter((classItem) => classItem.id !== id))
        fetchClasses()
      })
      .catch((error) => {
        console.error('Error deleting class:', error)
      })
  }

  return (
    <div className='mx-auto p-6 bg-gray-100 min-h-screen'>
      <header>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Admin Portal - Classes</h1>
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            className='border border-gray-400 p-2 rounded-l-lg flex-grow max-w-xl'
            placeholder='Search by class name'
          />
        </div>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>ClassID</th>
              <th className='p-4 text-left'>ClassName</th>
              <th className='p-4 text-left'>VideoLink</th>
              <th className='p-4 text-left'>TutorID</th>
              <th className='p-4 text-left'>StudentID</th>
              <th className='p-4 text-left'>Subscription type</th>
              <th className='p-4 text-left'>Length</th>
              <th className='p-4 text-left'>Available</th>
              <th className='p-4 text-left'>Type</th>
              <th className='p-4 text-left'>Description</th>
              <th className='p-4 text-left'>Price</th>
              <th className='p-4 text-left'>isActive</th>
              <th className='p-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem, index) => (
              <tr key={classItem.id} className='border-b hover:bg-gray-100'>
                <td className='p-4'>{index + 1}</td>
                <td className='p-4'>{classItem.classID}</td>
                <td className='p-4'>{classItem.className}</td>
                <td className='p-4'>{classItem.videoLink}</td>
                <td className='p-4'>{classItem.tutorID}</td>
                <td className='p-4'>{classItem.studentID}</td>
                <td className='p-4'>{classItem.paymentID}</td>
                <td className='p-4'>{classItem.length}</td>
                <td className='p-4'>{classItem.available}</td>
                <td className='p-4'>{classItem.type}</td>
                <td className='p-4'>{classItem.description}</td>
                <td className='p-4'>{classItem.price}</td>
                <td className='p-4'>{classItem.isActive ? 'Active' : 'Inactive'}</td>
                <td className='p-4'>
                  <button
                    onClick={() => deleteClass(classItem.classID)}
                    className='p-2 rounded-lg bg-red-500 text-white'
                  >
                    Delete
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

export default AdminPortalClass

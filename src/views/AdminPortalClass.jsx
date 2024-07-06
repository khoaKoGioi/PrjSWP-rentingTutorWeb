import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'

const AdminPortalClass = () => {
  const [classes, setClasses] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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
      <header className='bg-purple-600 text-white shadow-md py-4'>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-4xl font-bold mb-6 text-center text-black'>Admin Portal - Classes</h1>
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleInputChange}
            className='border border-gray-400 p-2 rounded-lg flex-grow max-w-xl focus:outline-none focus:ring-2 focus:ring-purple-500'
            placeholder='Search by class name'
          />
        </div>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gradient-to-t from-yellow-700 to-yellow-300 text-black'>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>ClassID</th>
              <th className='p-4 text-left'>Class Name</th>
              <th className='p-4 text-left'>Video</th>
              <th className='p-4 text-left'>TutorID</th>
              <th className='p-4 text-left'>StudentID</th>
              <th className='p-4 text-left'>Subscription type</th>
              <th className='p-4 text-left'>Length</th>
              <th className='p-4 text-left'>Available</th>
              <th className='p-4 text-left'>Type</th>
              <th className='p-4 text-left'>Description</th>
              <th className='p-4 text-left'>Price</th>
              <th className='p-4 text-left'>Active</th>
              <th className='p-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem, index) => (
              <tr key={classItem.id} className='border-b hover:bg-purple-50'>
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
                <td className='p-4 break-after-column break-word'>{classItem.description}</td>
                <td className='p-4'>{classItem.price}</td>
                <td className='p-4'>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      classItem.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {classItem.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
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

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'

const ClassList = () => {
  const [classes, setClasses] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Fetch classes from the API
    axios
      .get('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class')
      .then((response) => {
        const classesWithDefaultActive = response.data.map((cls) => ({ ...cls, isActive: cls.isActive ?? true }))
        setClasses(classesWithDefaultActive)
      })
      .catch((error) => {
        console.error('Error fetching classes:', error)
      })
  }, [])

  const handleSearch = () => {
    // Filter classes by title
    if (searchTerm.trim() !== '') {
      const filteredClasses = classes.filter((cls) => cls.title.toLowerCase().includes(searchTerm.toLowerCase()))
      setClasses(filteredClasses)
    } else {
      // Reset classes list if search term is empty
      axios
        .get('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class')
        .then((response) => {
          const classesWithDefaultActive = response.data.map((cls) => ({ ...cls, isActive: cls.isActive ?? true }))
          setClasses(classesWithDefaultActive)
        })
        .catch((error) => {
          console.error('Error fetching classes:', error)
        })
    }
  }

  const toggleActiveStatus = (id, isActive) => {
    // Update class's active status
    const newStatus = !isActive
    axios
      .put(`https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class/${id}`, { isActive: newStatus })
      .then((response) => {
        setClasses(classes.map((cls) => (cls.id === id ? { ...cls, isActive: newStatus } : cls)))
      })
      .catch((error) => {
        console.error('Error updating class status:', error)
      })
  }

  return (
    <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
      <header>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Class List</h1>
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border border-gray-400 p-2 rounded-l-lg flex-grow max-w-xl'
            placeholder='Search by class name'
          />
          <button onClick={handleSearch} className='bg-blue-600 text-white p-2 rounded-r-lg'>
            Search
          </button>
        </div>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>Title</th>
              <th className='p-4 text-left'>Tutor</th>
              <th className='p-4 text-left'>Lectures</th>
              <th className='p-4 text-left'>Active</th>
              <th className='p-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className='border-b hover:bg-gray-100'>
                <td className='p-4'>{cls.id}</td>
                <td className='p-4'>{cls.title}</td>
                <td className='p-4'>{cls.tutor}</td>
                <td className='p-4'>{cls.lectures}</td>
                <td className='p-4'>{cls.isActive ? 'Active' : 'Inactive'}</td>
                <td className='p-4'>
                  <button
                    onClick={() => toggleActiveStatus(cls.id, cls.isActive)}
                    className={`p-2 rounded-lg ${cls.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    {cls.isActive ? 'Disable' : 'Enable'}
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

export default ClassList

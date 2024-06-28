// src/ClassManagement.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'

const apiURL = 'https://667c07dd3c30891b865b026d.mockapi.io/ass2/class'

const ClassManagement = () => {
  const [classes, setClasses] = useState([])
  const [formData, setFormData] = useState({
    imageLink: '',
    title: '',
    tutor: '',
    description: '',
    lectures: '',
    rating: '',
    price: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      const response = await axios.get(apiURL)
      setClasses(response.data)
    } catch (error) {
      console.error('Error fetching classes:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAddClass = async () => {
    try {
      const response = await axios.post(apiURL, formData)
      setClasses([...classes, response.data])
      setFormData({
        imageLink: '',
        title: '',
        tutor: '',
        description: '',
        lectures: '',
        rating: '',
        price: ''
      })
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error adding class:', error)
    }
  }

  const handleDeleteClass = async (id) => {
    try {
      await axios.delete(`${apiURL}/${id}`)
      setClasses(classes.filter((cls) => cls.id !== id))
    } catch (error) {
      console.error('Error deleting class:', error)
    }
  }

  const handleUpdateClass = async (id, updatedData) => {
    try {
      const response = await axios.put(`${apiURL}/${id}`, updatedData)
      setClasses(classes.map((cls) => (cls.id === id ? response.data : cls)))
    } catch (error) {
      console.error('Error updating class:', error)
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
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4'
        >
          Add New Class
        </button>
        <div className='grid grid-cols-1 gap-4'>
          {classes.map((cls) => (
            <div key={cls.id} className='flex justify-between items-center p-4 border rounded shadow'>
              <div>
                <h2 className='text-lg font-bold'>{cls.title}</h2>
                <p className='text-sm'>{cls.tutor}</p>
                <p className='text-sm'>Lectures: {cls.lectures}</p>
              </div>
              <div>
                <button
                  onClick={() => handleUpdateClass(cls.id, formData)}
                  className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mr-2'
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClass(cls.id)}
                  className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded shadow-lg w-1/2 mt-20'>
              <h2 className='text-xl font-bold mb-4'>Add New Class</h2>
              <div className='mb-4'>
                <label className='block mb-2'>Image Link</label>
                <input
                  type='text'
                  name='imageLink'
                  value={formData.imageLink}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Title</label>
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Tutor</label>
                <input
                  type='text'
                  name='tutor'
                  value={formData.tutor}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Description</label>
                <input
                  type='text'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Lectures</label>
                <input
                  type='number'
                  name='lectures'
                  value={formData.lectures}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Rating</label>
                <input
                  type='number'
                  step='0.1'
                  name='rating'
                  value={formData.rating}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded'
                />
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
              <button
                onClick={handleAddClass}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2'
              >
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
      </div>
    </div>
  )
}

export default ClassManagement

import React, { useState, useEffect } from 'react'

const ClassForm = ({ addClass, editClass, updateClass }) => {
  const [formData, setFormData] = useState({
    id: '',
    imageLink: '',
    title: '',
    tutor: '',
    description: '',
    rating: '',
    price: '',
    lectures: ''
  })

  useEffect(() => {
    if (editClass) {
      setFormData(editClass)
    } else {
      setFormData({
        id: '',
        imageLink: '',
        title: '',
        tutor: '',
        description: '',
        rating: '',
        price: '',
        lectures: ''
      })
    }
  }, [editClass])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editClass) {
      updateClass(formData)
    } else {
      addClass(formData)
    }
    setFormData({
      id: '',
      imageLink: '',
      title: '',
      tutor: '',
      description: '',
      rating: '',
      price: '',
      lectures: ''
    })
  }

  return (
    <div className='mb-4'>
      <h2 className='text-xl font-semibold mb-2'>{editClass ? 'Edit Class' : 'Add New Class'}</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs for class details */}
        {/* Example: */}
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
          className='form-input'
          required
        />
        {/* Add more inputs as needed */}
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          {editClass ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  )
}

export default ClassForm

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'

const apiUrl = 'https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class'

const ClassManagement = () => {
  const [classes, setClasses] = useState([])
  const [newClass, setNewClass] = useState({
    id: '',
    imageLink: '',
    title: '',
    tutor: '',
    description: '',
    lectures: '',
    rating: '',
    price: ''
  })
  const [editing, setEditing] = useState(false)
  const [currentClass, setCurrentClass] = useState(null)

  useEffect(() => {
    loadClasses()
  }, [])

  const loadClasses = () => {
    axios
      .get('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class')
      .then((response) => setClasses(response.data))
      .catch((error) => console.log(error))
  }

  const addClass = (e) => {
    e.preventDefault()
    axios
      .post('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class', newClass)
      .then(() => {
        loadClasses()
        setNewClass({
          imageLink: '',
          title: '',
          tutor: '',
          description: '',
          lectures: '',
          rating: '',
          price: ''
        })
      })
      .catch((error) => console.log(error))
  }

  const editClass = (cls) => {
    setEditing(true)
    setCurrentClass(cls)
  }

  const updateClass = () => {
    axios
      .put(`${apiUrl}/${currentClass.id}`, currentClass)
      .then(() => {
        loadClasses()
        setEditing(false)
        setCurrentClass(null)
      })
      .catch((error) => console.log(error))
  }

  const deleteClass = (classId) => {
    axios
      .delete(`${apiUrl}/${classId}`)
      .then(() => loadClasses())
      .catch((error) => console.log(error))
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 px-6'>
      <header>
        <MegaMenuWithHover />
      </header>
      <div className='p-6 bg-gray-100 min-h-screen'>
        <h1 className='text-3xl font-bold mb-6 mt-10 text-center'>Manage Classes</h1>

        {/* Form for adding/editing class */}
        <form onSubmit={addClass} className='mb-8 p-6 bg-white shadow-md rounded-lg space-y-4'>
          <input
            type='text'
            placeholder='Image Link'
            value={newClass.imageLink}
            onChange={(e) => setNewClass({ ...newClass, imageLink: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <input
            type='text'
            placeholder='Title'
            value={newClass.title}
            onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <input
            type='text'
            placeholder='Tutor'
            value={newClass.tutor}
            onChange={(e) => setNewClass({ ...newClass, tutor: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <input
            type='text'
            placeholder='Description'
            value={newClass.description}
            onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <input
            type='text'
            placeholder='Lectures'
            value={newClass.lectures}
            onChange={(e) => setNewClass({ ...newClass, lectures: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <input
            type='text'
            placeholder='Rating'
            value={newClass.rating}
            onChange={(e) => setNewClass({ ...newClass, rating: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <input
            type='text'
            placeholder='Price'
            value={newClass.price}
            onChange={(e) => setNewClass({ ...newClass, price: e.target.value })}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
          />
          <button
            onClick={addClass}
            className='w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 active:bg-orange-400 focus:outline-none'
          >
            Add Class
          </button>
        </form>

        {/* Table displaying classes */}
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4 text-center'>Class List</h2>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Title
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Tutor
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>{cls.title}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{cls.tutor}</td>
                  <td className='px-6 py-4 whitespace-nowrap space-x-2'>
                    <button
                      onClick={() => editClass(cls)}
                      className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteClass(cls.id)}
                      className='px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editing && currentClass && (
          <div className='mt-8 p-6 bg-white shadow-md rounded-lg space-y-4'>
            <h2 className='text-2xl font-bold mb-4'>Edit Class</h2>
            <input
              type='text'
              placeholder='Image Link'
              value={currentClass.imageLink}
              onChange={(e) => setCurrentClass({ ...currentClass, imageLink: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <input
              type='text'
              placeholder='Title'
              value={currentClass.title}
              onChange={(e) => setCurrentClass({ ...currentClass, title: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <input
              type='text'
              placeholder='Tutor'
              value={currentClass.tutor}
              onChange={(e) => setCurrentClass({ ...currentClass, tutor: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <input
              type='text'
              placeholder='Description'
              value={currentClass.description}
              onChange={(e) => setCurrentClass({ ...currentClass, description: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <input
              type='text'
              placeholder='Lectures'
              value={currentClass.lectures}
              onChange={(e) => setCurrentClass({ ...currentClass, lectures: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <input
              type='text'
              placeholder='Rating'
              value={currentClass.rating}
              onChange={(e) => setCurrentClass({ ...currentClass, rating: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <input
              type='text'
              placeholder='Price'
              value={currentClass.price}
              onChange={(e) => setCurrentClass({ ...currentClass, price: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
            />
            <button
              onClick={updateClass}
              className='w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'
            >
              Update Class
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassManagement

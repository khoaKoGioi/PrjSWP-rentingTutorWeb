import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'

const AdminPortal = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Fetch users from the API
    axios
      .get('https://667c07dd3c30891b865b026d.mockapi.io/ass2/user')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  const handleSearch = () => {
    // Filter users by name
    if (searchTerm.trim() !== '') {
      const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setUsers(filteredUsers)
    } else {
      // Reset users list if search term is empty
      axios
        .get('https://667c07dd3c30891b865b026d.mockapi.io/ass2/user')
        .then((response) => {
          setUsers(response.data)
        })
        .catch((error) => {
          console.error('Error fetching users:', error)
        })
    }
  }

  const toggleActiveStatus = (id, isActive) => {
    // Update user's active status
    const newStatus = !isActive
    axios
      .put(`https://667c07dd3c30891b865b026d.mockapi.io/ass2/user/${id}`, { isActive: newStatus })
      .then((response) => {
        setUsers(users.map((user) => (user.id === id ? { ...user, isActive: newStatus } : user)))
      })
      .catch((error) => {
        console.error('Error updating user status:', error)
      })
  }

  return (
    <div className='container mx-auto p-6 bg-gray-100 min-h-screen'>
      <header>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Admin Portal</h1>
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='border border-gray-400 p-2 rounded-l-lg flex-grow max-w-xl'
            placeholder='Search by name'
          />
          <button onClick={handleSearch} className='bg-blue-600 text-white p-2 rounded-r-lg'>
            Search
          </button>
        </div>
        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='p-4 text-left'>ID</th>
              <th className='p-4 text-left'>Name</th>
              <th className='p-4 text-left'>Role</th>
              <th className='p-4 text-left'>Email</th>
              <th className='p-4 text-left'>Active</th>
              <th className='p-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className='border-b hover:bg-gray-100'>
                <td className='p-4'>{user.id}</td>
                <td className='p-4'>{user.name}</td>
                <td className='p-4'>{user.role}</td>
                <td className='p-4'>{user.email}</td>
                <td className='p-4'>{user.isActive ? 'Active' : 'Inactive'}</td>
                <td className='p-4'>
                  <button
                    onClick={() => toggleActiveStatus(user.id, user.isActive)}
                    className={`p-2 rounded-lg ${user.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
                  >
                    {user.isActive ? 'Disable' : 'Enable'}
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

export default AdminPortal

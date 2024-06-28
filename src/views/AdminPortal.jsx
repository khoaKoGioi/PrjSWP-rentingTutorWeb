import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Admin Portal</h1>
      <div className='flex mb-4'>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border p-2 flex-grow'
          placeholder='Search by name'
        />
        <button onClick={handleSearch} className='bg-blue-500 text-white p-2 ml-2'>
          Search
        </button>
      </div>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            <th className='border p-2'>ID</th>
            <th className='border p-2'>Name</th>
            <th className='border p-2'>Role</th>
            <th className='border p-2'>Email</th>
            <th className='border p-2'>Active</th>
            <th className='border p-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='border p-2'>{user.id}</td>
              <td className='border p-2'>{user.name}</td>
              <td className='border p-2'>{user.role}</td>
              <td className='border p-2'>{user.email}</td>
              <td className='border p-2'>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td className='border p-2'>
                <button
                  onClick={() => toggleActiveStatus(user.id, user.isActive)}
                  className={`p-2 ${user.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                  {user.isActive ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPortal

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import AccessDeniedPage from '../components/AccessDeniedPage.jsx'

const AdminTutorRequests = () => {
  const [requests, setRequests] = useState([])
  const [tutors, setTutors] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const role1 = localStorage.getItem('role')
  if (role1 !== 'Admin') {
    return <AccessDeniedPage />
  }

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/getRequest')
        const requestsData = response.data.data

        // Fetch tutor information for each request
        const tutorRequests = requestsData.map((request) =>
          axios.get(`http://localhost:5000/api/users/getTutor/${request.userID}`)
        )
        console.log(tutorRequests)

        const tutorsData = await Promise.all(tutorRequests)

        const tutorsInfo = tutorsData.reduce((acc, curr) => {
          acc[curr.data.data.tutorID] = curr.data.data
          return acc
        }, {})

        setRequests(requestsData)
        setTutors(tutorsInfo)
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error loading requests')
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const handleAction = async (userID, action) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/handleTutor/${userID}`, { status: action })
      setRequests(requests.map((req) => (req.userID === userID ? { ...req, status: action } : req)))
    } catch (error) {
      alert(error.response ? error.response.data.message : 'Error performing action')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className='mx-auto p-6 bg-gray-100 min-h-screen'>
      <header className='bg-purple-600 text-white shadow-md py-4'>
        <MegaMenuWithHover />
      </header>
      <div className='pt-20'>
        <h1 className='text-4xl font-bold mb-6 text-center text-black'>Admin Portal - Tutor Requests</h1>
        <div className='overflow-x-auto'>
          <table className='mx-auto min-w-max bg-white shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gradient-to-t from-yellow-700 to-yellow-300 text-black'>
              <tr>
                <th className='p-4 text-left'>ID</th>
                <th className='p-4 text-left'>User ID</th>
                <th className='p-4 text-left'>Tutor ID</th>
                <th className='p-4 text-left'>Degree</th>
                <th className='p-4 text-left'>Identity Card</th>
                <th className='p-4 text-left'>Status</th>

                <th className='p-4 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                const tutor = tutors[request.tutorID]
                return (
                  <tr key={request.id} className='border-b hover:bg-purple-50'>
                    <td className='p-4'>{index + 1}</td>
                    <td className='p-4'>{request.userID}</td>
                    <td className='p-4'>{request.tutorID}</td>
                    <td className='p-4'>
                      {tutor && tutor.degrees ? (
                        <img src={tutor.degrees} alt='Tutor Degree' className='w-20 h-20 object-cover' />
                      ) : (
                        'No Degree'
                      )}
                    </td>
                    <td className='p-4'>
                      {tutor && tutor.identityCard ? (
                        <img src={tutor.identityCard} alt='Identity Card' className='w-20 h-20 object-cover' />
                      ) : (
                        'No ID Card'
                      )}
                    </td>
                    <td className='p-4'>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${
                          request.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : request.status === 'Accept'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>

                    <td className='p-4'>
                      {request.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleAction(request.userID, 'Accept')}
                            className='mr-2 p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors duration-300'
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(request.userID, 'Deny')}
                            className='p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-300'
                          >
                            Deny
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminTutorRequests

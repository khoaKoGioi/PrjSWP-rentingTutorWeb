import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import { Typography, Card, CardBody } from '@material-tailwind/react'
import { Pagination } from '@nextui-org/react'
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx'
import PriceRangeSlider from '../components/PriceRangeSlider.jsx'
import ClassCard from '../components/ClassCard.jsx' // Assuming ClassCard component exists

const itemsPerPage = 12

const ClassList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // const response = await fetch('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class')
        const response = await fetch('http://localhost:5000/api/admin/classList')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchClasses()
  }, [])

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='container mx-auto p-4 pt-16'>
      <header>
        <MegaMenuWithHover />
      </header>

      <div className='w-3/4 p-4 flex justify-between'>
        <div>
          <BreadcrumbsWithIcon pathnames={['Home', 'ClassList']} />
          <Typography variant='h3' className='mt-2'>
            Filters by
          </Typography>
        </div>
        <div className='flex items-end pl-10'>
          <Typography variant='h3' className='mt-2'>
            {data.length} results for Class
          </Typography>
        </div>
      </div>

      <div className='flex'>
        <aside className='w-1/4 p-4 rounded-lg shadow-md'>
          {/* Include the PriceRangeSlider component */}
          <PriceRangeSlider onChange={(value) => console.log(value)} />

          <div className='mt-6'>
            <Typography variant='h6' className='text-gray-800 font-bold mb-2'>
              Filter by Rating
            </Typography>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>1 Star & Up</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>2 Stars & Up</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>3 Stars & Up</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>4 Stars & Up</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>5 Stars</span>
              </label>
            </div>
          </div>

          <div className='mt-6'>
            <Typography variant='h6' className='text-gray-800 font-bold mb-2'>
              Filter by Duration
            </Typography>
            <div className='space-y-2'>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>Under 60 Minutes</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>Less Than 2 Hours</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>1-4 Weeks</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>1-3 Months</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='form-checkbox text-blue-500' />
                <span className='ml-2 text-gray-700'>3-6 Months</span>
              </label>
            </div>
          </div>
        </aside>

        <main className='w-3/4 px-7'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
            {currentData.map((item) => (
              <Link to={`/classDetail/${item.classID}`} key={item.classID} state={item}>
                <Card className='group relative overflow-hidden hover:opacity-75'>
                  <img
                    src={`https://img.youtube.com/vi/${item.videoLink.split('v=')[1]}/0.jpg`}
                    alt={item.className}
                    className='object-cover'
                  />
                  <CardBody className='py-4'>
                    <Typography variant='h5' className='font-bold'>
                      {item.className}
                    </Typography>
                    <Typography variant='body2' className='mt-2'>
                      Tutor: {item.tutorFullName}
                    </Typography>
                    <Typography variant='body2' className='mt-2'>
                      Price: ${item.price}
                    </Typography>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>

          <div className='flex justify-center mt-8'>
            <Pagination
              total={totalPages}
              active={currentPage}
              maxVisible={5}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default ClassList

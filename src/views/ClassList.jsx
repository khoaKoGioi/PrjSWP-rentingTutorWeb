import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import { Typography } from '@material-tailwind/react'
import ClassCard from '../components/ClassCard.jsx'
import { Pagination } from '@nextui-org/react'
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx'
import PriceRangeSlider from '../components/PriceRangeSlider.jsx'

const itemsPerPage = 12 // 4 rows with 3 items each

const ClassList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('https://6676c5c6145714a1bd72bec9.mockapi.io/swp/class')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchClasses()
  }, [])

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Get the data for the current page
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Handle page change
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
            {data.length} results for "react"
          </Typography>
        </div>
      </div>

      <div className='flex'>
        <aside className='w-1/4 p-4'>
          <Link to='/manage-classes'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4'>
              Manage Classes
            </button>
          </Link>

          {/* Include the PriceRangeSlider component */}
          <PriceRangeSlider onChange={(value) => console.log(value)} />

          <div className='mb-6'>
            <Typography variant='h6'>Filter by Rating</Typography>
            <div>
              <label>
                <input type='checkbox' /> 1 Star & Up
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 2 Stars & Up
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 3 Stars & Up
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 4 Stars & Up
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 5 Stars
              </label>
            </div>
          </div>
          <div>
            <Typography variant='h6'>Filter by Duration</Typography>
            <div>
              <label>
                <input type='checkbox' /> Under 60 Minutes
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> Less Than 2 Hours
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 1-4 Weeks
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 1-3 Months
              </label>
            </div>
            <div>
              <label>
                <input type='checkbox' /> 3-6 Months
              </label>
            </div>
          </div>
        </aside>
        <main className='w-3/4 p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
            {currentData.map((item) => (
              <ClassCard
                key={item.id}
                id={item.id}
                imageLink={item.imageLink}
                title={item.title}
                tutor={item.title}
                description={item.description}
                rating={item.rating}
                price={item.price}
                lectures={item.lectures}
              />
            ))}
          </div>

          <div className='flex justify-center mt-8'>
            <Pagination
              showControls
              total={totalPages}
              initialPage={currentPage}
              onChange={(page) => handlePageChange(page)}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

export default ClassList

import React, { useState, useEffect } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { MegaMenuWithHover } from '../components/MegaMenuWithHover.jsx'
import { Typography, Card, CardBody, Button } from '@material-tailwind/react'
import BreadcrumbsWithIcon from '../components/BreadCrumb.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons'
import RatingWithComment from '../components/Rating.jsx'
import { CircularImg } from '../components/CircularImg.jsx' // Assuming CircularImg is in the same directory

const ClassDetail = () => {
  const location = useLocation()
  const { id, imageLink, title, description, tutor, lectures, price, videoLink } = location.state

  // Tutor information using useState
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    // Fetch additional data if needed
  }, [])

  const getYoutubeThumbnail = (url) => {
    const videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      return `https://img.youtube.com/vi/${videoId.substring(0, ampersandPosition)}/0.jpg`
    }
    return `https://img.youtube.com/vi/${videoId}/0.jpg`
  }

  const handleVideoClick = () => {
    setShowVideo(true)
  }

  const handleCloseVideo = () => {
    setShowVideo(false)
  }

  // Dummy data for other classes
  const otherClasses = [
    {
      id: 1,
      imageLink: 'class1.jpg',
      name: 'Class 1',
      description: 'Description of Class 1'
    },
    {
      id: 2,
      imageLink: 'class2.jpg',
      name: 'Class 2',
      description: 'Description of Class 2'
    },
    {
      id: 3,
      imageLink: 'class3.jpg',
      name: 'Class 3',
      description: 'Description of Class 3'
    }
    // Add more classes here...
  ]

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <header>
        <MegaMenuWithHover />
      </header>

      <div className='container mx-auto pl-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col pt-16'>
          <BreadcrumbsWithIcon pathnames={['Home', 'ClassList', `ClassDetail ${id}`]} />
        </div>
      </div>

      <div className='container mx-auto p-4 flex flex-col md:flex-row gap-8'>
        <div className='w-full md:w-3/4 mb-4 flex flex-col gap-4'>
          <Card className='shadow-lg w-full'>
            <CardBody className='flex flex-col md:flex-row items-start md:items-center gap-5 p-6'>
              <div className='w-full md:w-1/2'>
                <div className='relative cursor-pointer' onClick={handleVideoClick}>
                  <img
                    src={getYoutubeThumbnail(videoLink)}
                    alt='Video Thumbnail'
                    className='w-full h-auto rounded-lg'
                  />
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <FontAwesomeIcon
                      icon={faPlay}
                      className='h-16 w-16 text-white opacity-75 cursor-pointer hover:opacity-100'
                    />
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/2'>
                <Typography variant='h4' className='mb-4'>
                  {title}
                </Typography>
                <Typography variant='body1' className='mb-4'>
                  {description}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Tutor:</strong> {tutor.name}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Rating:</strong> {tutor.rating}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Available:</strong> Mon-Thu-Sat
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Lectures:</strong> {lectures}
                </Typography>
                <Typography variant='body2' className='mb-2'>
                  <strong>Price:</strong> ${price}
                </Typography>
                <Button className='w-50'>Enroll now</Button>
              </div>
            </CardBody>
          </Card>

          <Card className='shadow-lg w-full'>
            <CardBody>
              <Typography variant='h3' className='mb-2'>
                All reviews
              </Typography>
              <RatingWithComment />
            </CardBody>
          </Card>
        </div>

        <div className='w-full md:w-1/4 pb-4'>
          <Card className='shadow-lg h-full flex flex-col'>
            <CardBody className='flex flex-col items-center p-6 flex-grow'>
              <CircularImg avatar={tutor.avatar} />
              <Typography variant='h5' className='mb-2'>
                {tutor.name}
              </Typography>
              <Typography variant='body1' className='text-center'>
                {tutor.description}
              </Typography>
              <Typography variant='body2' className='mt-4'>
                <strong>Rating:</strong> {tutor.rating}
              </Typography>
              <Typography variant='body2'>
                <strong>Subjects:</strong> {tutor.subjects}
              </Typography>

              <NavLink
                to='/tutor-profile'
                className='w-50 bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-300'
              >
                Request now
              </NavLink>

              <Typography className='p-5' variant='h5'>
                More classes with {tutor.name}
              </Typography>

              <Card className='shadow-lg w-full max-h-80 overflow-y-auto'>
                <CardBody>
                  {otherClasses.map((otherClass) => (
                    <Card key={otherClass.id} className='flex mb-4'>
                      <div className='flex-none w-32'>
                        <img
                          src={otherClass.imageLink}
                          alt={otherClass.name}
                          className='w-full h-24 object-cover rounded-lg'
                        />
                      </div>
                      <div className='flex-grow p-4'>
                        <Typography variant='h5' className='mb-2'>
                          {otherClass.name}
                        </Typography>
                        <Typography variant='body1' className='mb-2'>
                          {otherClass.description}
                        </Typography>
                      </div>
                    </Card>
                  ))}
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Video Popup */}
      {showVideo && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center'>
          <div className='relative w-full h-full max-w-screen-lg'>
            <div className='absolute top-48 right-48 m-4 cursor-pointer text-white z-10'>
              <FontAwesomeIcon icon={faTimes} className='h-8 w-8' onClick={handleCloseVideo} />
            </div>
            <iframe
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/${videoLink.split('v=')[1]}`}
              title='YouTube Video Player'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClassDetail

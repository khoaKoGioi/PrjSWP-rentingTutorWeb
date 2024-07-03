import React, { useState, useEffect } from 'react'
import { Input, Button } from '@material-tailwind/react'
import axios from 'axios'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (query.length > 0) {
      fetchSuggestions(query)
    } else {
      setSuggestions([])
    }
  }, [query])

  const fetchSuggestions = async (searchQuery) => {
    try {
      const tutorResponse = await axios.get(`http://localhost:5000/api/students/searchTutorByTutorName/${searchQuery}`)
      const classResponse = await axios.get(`http://localhost:5000/api/students/searchClassByTutorName/${searchQuery}`)

      const tutorSuggestions = tutorResponse.data.data
      const classSuggestions = classResponse.data.data

      setSuggestions([...classSuggestions, ...tutorSuggestions])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <div className='relative flex flex-col w-full gap-2 md:w-max'>
      <div className='relative flex w-full gap-2'>
        <Input
          type='search'
          color='blue-gray'
          labelProps={{
            className: 'before:content-none after:content-none'
          }}
          className='pr-20 border-white blue-gray bg-white focus:!border-transparent'
          containerProps={{
            className: 'min-w-[500px] border-white'
          }}
          value={query}
          onChange={handleInputChange}
          placeholder='Search for tutors or classes...'
        />
        <Button
          size='sm'
          color='blue'
          className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-3 bg-gradient-to-r from-orange-500 to-orange-800 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none !absolute right-1 top-1 rounded '
        >
          Search
        </Button>
      </div>
      {suggestions.length > 0 && (
        <ul className='absolute z-10 w-full mt-12 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto'>
          {suggestions.map((suggestion, index) => (
            <li key={index} className='px-4 py-2 cursor-pointer hover:bg-gray-100 text-black'>
              {suggestion.className ? (
                <a href={`/classDetail/${suggestion.classID}`} className='block'>
                  {suggestion.className}
                </a>
              ) : (
                <a href={`/tutor-profile/${suggestion.userID}`} className='block'>
                  {suggestion.fullName}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar

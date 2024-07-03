import React, { useContext } from 'react'
import NavListRegister from './Navigation/NavListRegister.jsx'
import ProfileMenu from './ProfileMenu'
import NavListMenu from './NavListMenu.jsx'
import { List, ListItem, Typography } from '@material-tailwind/react'
import AuthContext from '../contexts/JWTAuthContext' // Import AuthContext
import { NavLink, useNavigate } from 'react-router-dom'

function NavList() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate() // Use useNavigate hook

  return (
    <List className='mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-2'>
      <Typography as='div' variant='small' color='white' className='font-medium'>
        <ListItem className='flex items-center text-lg gap-2 py-2 pr-4 font-extrabold'>
          <NavLink to='/' className='flex items-center gap-2'>
            Home
          </NavLink>
        </ListItem>
      </Typography>

      <Typography as='div' variant='small' color='white' className='font-medium'>
        <ListItem className='flex items-center text-lg gap-2 py-2 pr-4 font-extrabold'>
          <NavLink to='/ClassList' className='flex items-center gap-2'>
            Choose your classes
          </NavLink>
        </ListItem>
      </Typography>

      <NavListMenu />

      {isAuthenticated ? (
        <ProfileMenu />
      ) : (
        <>
          <Typography as='div' variant='small' color='white' className='font-medium'>
            <ListItem
              className='flex items-center text-lg gap-2 py-2 pr-4 font-extrabold bg-white'
              onClick={() => navigate('/login')}
            >
              <span className='bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent'>
                Login
              </span>
            </ListItem>
          </Typography>
          <div>
            <NavListRegister />
          </div>
        </>
      )}
    </List>
  )
}

export default NavList

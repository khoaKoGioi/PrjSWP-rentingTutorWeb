import React, { useContext } from 'react'
import NavListRegister from './Navigation/NavListRegister.jsx'
import ProfileMenu from './ProfileMenu'
import NavListMenu from './NavListMenu.jsx'
import { List, ListItem, Menu, MenuHandler, MenuList, Typography } from '@material-tailwind/react'
import AuthContext from '../contexts/JWTAuthContext' // Import AuthContext
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from 'lucide-react'

function NavList() {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate() // Use useNavigate hook
  const role = localStorage.getItem('role')
  const adminPortalLinks = [
    {
      title: 'Manage User',
      path: '/admin-portal'
    },
    {
      title: 'Manage Tutor',
      path: '/admin-portal-tutor'
    },
    {
      title: 'Manage Class',
      path: '/admin-portal-class'
    },
    {
      title: 'Manage Student',
      path: '/admin-portal-student'
    },
    {
      title: 'Manage Request',
      path: '/admin-portal-tutor-request'
    }
  ]

  const renderManageClassLink = role === 'Tutor' && (
    <Typography as='div' variant='small' color='white' className='font-medium'>
      <ListItem className='flex items-center text-lg gap-2 py-2 pr-4 font-extrabold'>
        <NavLink to='/manage-classes' className='flex items-center gap-2'>
          Manage Class
        </NavLink>
      </ListItem>
    </Typography>
  )

  const renderAdminClassLink = role === 'Admin' && (
    <Menu offset={{ mainAxis: 20 }} placement='bottom' allowHover={true}>
      <MenuHandler>
        <Typography as='div' variant='small' className='font-medium'>
          <ListItem className='flex items-center gap-2 py-2 pr-4 text-lg text-white font-extrabold'>
            Admin Portal
            <ChevronDownIcon strokeWidth={2.5} className='hidden h-3 w-3 transition-transform lg:block' />
          </ListItem>
        </Typography>
      </MenuHandler>
      <MenuList className='hidden max-w-screen-xl rounded-xl lg:block'>
        <ul className='outline-none'>
          {adminPortalLinks.map((link, index) => (
            <NavLink key={index} to={link.path}>
              <ListItem className='flex items-center gap-2 py-2 pr-4 text-lg text-blue-gray-900 font-extrabold'>
                {link.title}
              </ListItem>
            </NavLink>
          ))}
        </ul>
      </MenuList>
    </Menu>
  )

  return (
    <List className='mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 gap-2'>
      <Typography as='div' variant='small' color='white' className='font-medium'>
        <ListItem className='flex items-center text-lg gap-2 py-2 pr-4 font-extrabold'>
          <NavLink to='/' className='flex items-center gap-2'>
            Home
          </NavLink>
        </ListItem>
      </Typography>

      {role === 'Tutor' && renderManageClassLink}

      {role === 'Admin' && renderAdminClassLink}

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

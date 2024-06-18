import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
//import databaseService from '../../services/database.services'

const mock = new MockAdapter(axios)
//const pool = databaseService.connect()

const userList = [
  {
    id: 1,
    role: 'SA',
    name: 'Jason Alexander',
    username: 'jason_alexander',
    email: 'jason@ui-lib.com',
    password: '123',
    avatar:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    age: 25
  }
]

// Login Endpoint
mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    const { email, password } = JSON.parse(config.data)
    const user = userList.find((u) => u.email === email && u.password === password)

    if (!user) return [400, { message: 'Invalid email or password' }]

    const payload = { user }
    return [200, payload]
  } catch (err) {
    console.error(err)
    return [500, { message: 'Internal server error' }]
  }
})

// Register Endpoint
mock.onPost('/api/auth/register').reply((config) => {
  try {
    const { email, username, password } = JSON.parse(config.data)
    const user = userList.find((u) => u.email === email)

    if (user) return [400, { message: 'User already exists!' }]

    const newUser = {
      id: userList.length + 1,
      role: 'GUEST',
      name: 'Unknown',
      age: 25,
      email: email,
      password: password,
      username: username,
      avatar: '/assets/images/face-6.jpg'
    }

    userList.push(newUser)

    const payload = { user: { ...newUser } }
    return [200, payload]
  } catch (err) {
    console.error(err)
    return [500, { message: 'Internal server error' }]
  }
})

// Profile Endpoint
mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const { Authorization } = config.headers
    if (!Authorization || Authorization.split(' ')[1] !== 'mockAccessToken') {
      return [401, { message: 'Invalid authorization token' }]
    }

    const payload = { user: userList[0] }
    return [200, payload]
  } catch (err) {
    console.error(err)
    return [500, { message: 'Internal server error' }]
  }
})

export default mock

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
//import databaseService from '../../services/database.services'

const mock = new MockAdapter(axios)

const userList = [
  {
    id: 1,
    role: 'SA',
    avatar:
    "https://i.pinimg.com/originals/b5/d9/f6/b5d9f6262c408ee0fdd6ce12f2e6e1b9.jpg",
    username: "Khoa cute",
    name: "Anh Khoa",
    email: "khoaDeThuong@gmail.com",
    phone: "0900090090",
    school: "FPT University",
    dob: "2004-01-01",
    grade: "12",
    password:"123",
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

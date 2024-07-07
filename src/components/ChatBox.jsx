import React, { useState, useEffect, useContext, forwardRef, useImperativeHandle } from 'react'
import io from 'socket.io-client'
import { FaComments, FaTimes } from 'react-icons/fa'
import AuthContext from '../contexts/JWTAuthContext'
import axios from 'axios'

const socket = io('http://localhost:5000') // Ensure the URL matches your server

const ChatBox = forwardRef((props, ref) => {
  const { user } = useContext(AuthContext)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null) // State to hold the selected user
  const [users, setUsers] = useState([]) // State to hold the list of users (tutors or students)

  if (!user) {
    return <div></div>
  }

  useImperativeHandle(ref, () => ({
    sendMessage: async (messageText, recipient) => {
      try {
        setSelectedUser(recipient)
        const message = {
          senderID: user.userID,
          receiverID: recipient.userID,
          senderType: user.role,
          receiverType: recipient.role,
          messageText,
          timestamp: new Date()
        }

        const response = await axios.post(
          `http://localhost:5000/api/users/sendMessage/${user.userID}&${recipient.userID}`,
          {
            ...message
          }
        )
        setIsOpen(true)
        if (recipient.userID === selectedUser.userID) {
          setMessages((prevMessages) => [...prevMessages, message])
        }
        // Notify other user via socket
        socket.emit('sendMessage', message)
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }))

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('receiveMessage', (message) => {
      if (selectedUser && (message.senderID === selectedUser.userID || message.receiverID === selectedUser.userID)) {
        setMessages((prevMessages) => [...prevMessages, message])
      }
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    return () => {
      socket.off('connect')
      socket.off('receiveMessage')
      socket.off('disconnect')
    }
  }, [selectedUser])

  useEffect(() => {
    // Fetch users (tutors or students) from the server
    axios
      .get('http://localhost:5000/api/admin/getUser')
      .then((response) => {
        setUsers(response.data.data)
        setSelectedUser(response.data.data[0])
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  useEffect(() => {
    if (selectedUser) {
      // Fetch chat history with the selected user
      handleGetMessage(user.userID, selectedUser.userID)
    }
  }, [user.userID, selectedUser])

  const handleGetMessage = async (senderID, receiverID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/getMessage/${senderID}&${receiverID}`)
      setMessages(response.data.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!selectedUser) return // Ensure a user is selected before sending a message

    const message = {
      senderID: user.userID,
      receiverID: selectedUser.userID,
      senderType: user.role,
      receiverType: selectedUser.role,
      messageText: newMessage,
      timestamp: new Date()
    }

    const response = await axios.post(
      `http://localhost:5000/api/users/sendMessage/${message.senderID}&${message.receiverID}`,
      {
        ...message
      }
    )
    socket.emit('sendMessage', message)
    setNewMessage('')
  }

  const toggleChatBox = () => {
    setIsOpen(!isOpen)
    setIsSelectOpen(false)
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setIsOpen(true) // Ensure the chat box is open after selecting a user
    setIsSelectOpen(false) // Close the user list after selecting a user
  }

  const toggleUserList = () => {
    setIsSelectOpen(!isSelectOpen)
  }

  if (!user) {
    return null // Return null if the user is not logged in
  }

  return (
    <div
      className={`chat-box ${
        isOpen ? 'open' : ''
      } fixed bottom-0 right-0 mb-4 mr-4 w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div
        className='chat-header bg-blue-500 text-white p-3 flex justify-between items-center cursor-pointer'
        onClick={toggleChatBox}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
        <span className='font-bold ml-2'>{selectedUser ? `${selectedUser.fullName} Chat` : 'Select a User'}</span>
      </div>
      {isOpen && (
        <div className='chat-content flex flex-col p-3 h-full'>
          <div className='messages flex-1 overflow-y-auto mb-3 space-y-3'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message p-2 rounded-lg ${
                  msg.senderID === user.userID ? 'self bg-blue-100 text-right' : 'bg-gray-100 text-left'
                }`}
              >
                <strong>{msg.senderType}</strong>: {msg.messageText}
                <span className='block text-xs text-gray-500'>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
          <div className='input-box flex'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Type a message'
              className='flex-1 border p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button onClick={handleSendMessage} className='bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600'>
              Send
            </button>
          </div>
          {/* Toggle user list button */}
          <div className='toggle-user-list flex left-4 bottom-4 mt-3'>
            <button
              onClick={toggleUserList}
              className='bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none'
            >
              {isSelectOpen ? 'Close' : 'Select User'}
            </button>
          </div>
        </div>
      )}
      {/* User list section */}
      <div
        className={`user-list ${
          isSelectOpen ? 'block' : 'hidden'
        } absolute bottom-32 right-4 bg-white shadow-lg rounded-lg overflow-hidden p-3 max-h-60 w-60 border`}
      >
        <h3 className='text-lg font-semibold mb-3'>Select a User</h3>
        <ul className='divide-y divide-gray-200 max-h-60 overflow-y-auto'>
          {users.map((user) => (
            <li
              key={user.userID}
              className='flex items-center justify-start cursor-pointer hover:bg-gray-100 p-2'
              onClick={() => handleUserSelect(user)}
            >
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : 'https://img.freepik.com/free-vector/cute-man-business-cartoon-vector-icon-illustration-people-business-isolated-flat-vector_138676-10703.jpg'
                }
                alt={`${user.fullName}'s avatar`}
                className='w-8 h-8 rounded-full object-cover mr-2'
              />
              <div>
                <p className='text-sm'>{user.fullName}</p>
                <p className='text-xs text-gray-500'>{user.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ChatBox

//khai báo
import { Router } from 'express'
import { loginController, registerController } from '../controllers/users.controllers'
import { loginValidator } from '../middlewares/users.middlewares'
const usersRouter = Router()

usersRouter.post('/api/auth/login', loginValidator, loginController)
usersRouter.post('/register', registerController)

export default usersRouter

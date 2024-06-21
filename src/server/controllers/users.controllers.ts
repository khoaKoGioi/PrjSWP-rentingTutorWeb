import { log } from 'console'
import { Request, Response } from 'express'
import databaseService from '../services/database.services'

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const users = await databaseService.getUsers()
  const loggedUser = users.find((u) => u.email === email && u.passwordHash === password)
  if (loggedUser) {
    return res.json({
      data: [{ fname: loggedUser.fullname, email: loggedUser.email, password: loggedUser.passwordHash }]
    })
  } else {
    return res.status(400).json({
      error: 'login failed'
    })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await databaseService.insertUser(email, password)
    return res.status(200).json({
      message: 'Register success', //chỉnh lại thông báo
      result: result
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Register failed', //chỉnh lại thông báo
      err: err
    })
  }
}

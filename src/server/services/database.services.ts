import { log } from 'console'
import sql from 'mssql'
import { config } from 'dotenv'
import User from '../models/schemas/user.schema'
config()

const dbConfig = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_DATABASE as string,
  options: {
    encrypt: true, // Use true if you're using encryption
    trustServerCertificate: true, // Accept self-signed certificates
    enableArithAbort: true
  },
  port: parseInt(process.env.DB_PORT as string, 10)
}

class DatabaseService {
  private pool: sql.ConnectionPool

  constructor() {
    this.pool = new sql.ConnectionPool(dbConfig)
  }

  async connect() {
    try {
      await this.pool.connect()
      console.log('Successfully connected to MS SQL database!')
    } catch (error) {
      console.log('Error during the process of connecting to MS SQL', error)
      throw error
    }
  }

  // Method to fetch users
  async getUsers(email: string, password: string) {
    try {
      const request = this.pool.request()
      request.input('email', sql.VarChar, email)
      request.input('password', sql.VarChar, password)

      const result = await request.query(
        `SELECT * FROM ${process.env.DB_USERS_COLLECTION} WHERE email=@email AND passwordHash=@password`
      )
      log(result.recordset)
      return result.recordset
    } catch (error) {
      console.log('Error fetching users:', error)
      throw error
    }
  }

  //Method to resgister
  async insertUser(email: string, password: string) {
    try {
      const request = this.pool.request()
      request.input('email', sql.VarChar, email)
      request.input('password', sql.VarChar, password)

      const result = await request.query<User>(
        `INSERT INTO ${process.env.DB_USERS_COLLECTION} (email, passwordHash, role) 
        OUTPUT INSERTED.* 
        VALUES (@email, @password, 2)`
      )

      return result.recordset[0]
    } catch (error) {
      console.log('Error inserting user:', error)
      throw new Error('Cannot insert user: ' + error)
    }
  }

  // Add other methods to interact with the database as needed
}

const databaseService = new DatabaseService()
export default databaseService

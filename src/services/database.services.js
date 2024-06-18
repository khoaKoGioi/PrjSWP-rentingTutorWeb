const sql = require('mssql')
const { config } = require('dotenv')
config()

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Use true if you're using encryption
    trustServerCertificate: true, // Accept self-signed certificates
    enableArithAbort: true
  },
  port: parseInt(process.env.DB_PORT, 10)
}

class DatabaseService {
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

  // Add other methods to interact with the database as needed
}

const databaseService = new DatabaseService()
export default databaseService

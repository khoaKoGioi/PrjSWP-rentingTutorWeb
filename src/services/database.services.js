import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch((err) => {
    console.error('Database Connection Failed! Bad Config: ', err)
    console.error('Error Code:', err.code)
    console.error('Error Message:', err.message)
    console.error('Original Error:', err.originalError)
    return null
  })

export { sql, poolPromise }

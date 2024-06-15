import sql from 'mssql';

const config = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'TutorVerseDB',
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
    enableArithAbort: true 
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config: ', err);
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    console.error('Original Error:', err.originalError);
    return null; 
  });

export { sql, poolPromise };
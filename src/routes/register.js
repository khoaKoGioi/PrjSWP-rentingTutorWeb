import express from 'express';
import bcrypt from 'bcryptjs';
import { sql, poolPromise } from '../db.js';

const router = express.Router();
const SALT_ROUNDS = 10;

// Common function to register users
const registerUser = async (userDetails, res, role) => {
  try {
    const hashedPassword = await bcrypt.hash(userDetails.password, SALT_ROUNDS);
    const pool = await poolPromise;
    const request = pool.request();

    request.input('fullName', sql.NVarChar, userDetails.fullName);
    request.input('email', sql.NVarChar, userDetails.email);
    request.input('passwordHash', sql.NVarChar, hashedPassword);
    request.input('phone', sql.NVarChar, userDetails.phone);
    request.input('address', sql.NVarChar, userDetails.address);
    request.input('dateOfBirth', sql.Date, userDetails.dateOfBirth);
    request.input('role', sql.Int, role);
    request.input('emailVerifyToken', sql.NVarChar, ''); // Assuming default empty string
    request.input('forgotPasswordToken', sql.NVarChar, ''); // Assuming default empty string

    if (role === 2) { // Additional fields for tutors
      request.input('workplace', sql.NVarChar, userDetails.workplace);
      request.input('listOfSubjects', sql.NVarChar, userDetails.listOfSubjects);
      request.input('description', sql.NVarChar, userDetails.description);
      request.input('credentialFiles', sql.NVarChar, JSON.stringify(userDetails.credentialFiles));
      request.input('degreeFiles', sql.NVarChar, JSON.stringify(userDetails.degreeFiles));
      request.input('photoId', sql.NVarChar, JSON.stringify(userDetails.photoId));
    }

    const query = role === 1 
      ? `
        INSERT INTO Users (fullName, email, passwordHash, phone, address, dateOfBirth, role, emailVerifyToken, forgotPasswordToken)
        VALUES (@fullName, @email, @passwordHash, @phone, @address, @dateOfBirth, @role, @emailVerifyToken, @forgotPasswordToken)
      `
      : `
        INSERT INTO Users (fullName, email, passwordHash, phone, address, dateOfBirth, workplace, listOfSubjects, description, credentialFiles, degreeFiles, photoId, role, emailVerifyToken, forgotPasswordToken)
        VALUES (@fullName, @email, @passwordHash, @phone, @address, @dateOfBirth, @workplace, @listOfSubjects, @description, @credentialFiles, @degreeFiles, @photoId, @role, @emailVerifyToken, @forgotPasswordToken)
      `;

    await request.query(query);
    res.status(201).json({ message: role === 1 ? 'Student registered successfully' : 'Tutor registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

// Function to handle student registration
router.post('/student', async (req, res) => {
  const { fullName, email, password, phone, address, dateOfBirth } = req.body;

  // Validate input
  if (!fullName || !email || !password || !phone || !address || !dateOfBirth) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userDetails = { fullName, email, password, phone, address, dateOfBirth };
  await registerUser(userDetails, res, 1); // Assuming 1 is the role for students
});

// Function to handle tutor registration
router.post('/tutor', async (req, res) => {
  const {
    fullName,
    email,
    password,
    phone,
    address,
    dateOfBirth,
    workplace,
    listOfSubjects,
    description,
    credentialFiles,
    degreeFiles,
    photoId,
  } = req.body;

  // Validate input
  if (!fullName || !email || !password || !phone || !address || !dateOfBirth || !workplace || !listOfSubjects || !description || !credentialFiles || !degreeFiles || !photoId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const userDetails = { fullName, email, password, phone, address, dateOfBirth, workplace, listOfSubjects, description, credentialFiles, degreeFiles, photoId };
  await registerUser(userDetails, res, 2); // Assuming 2 is the role for tutors
});

export default router;
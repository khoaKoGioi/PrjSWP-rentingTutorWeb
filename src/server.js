import express from 'express';
import bodyParser from 'body-parser'; // To parse JSON bodies
import cors from 'cors'; // If you need CORS support
import registerRoutes from './routes/register.js'; // Import the register routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use the register routes
app.use('/api/register', registerRoutes);

// Define a simple route to check if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the TutorVerse API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
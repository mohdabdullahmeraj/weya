const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/index')

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// CORS middleware
app.use(cors());

// Main API router
app.use('/api', apiRoutes);

// A simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
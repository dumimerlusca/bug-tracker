const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

dotenv.config({ path: './config/config.env' })

const app = express();

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// Route files
const projects = require('./routes/projects');
const tickets = require('./routes/tickets');

// Mount routers
app.use('/api/v1/projects', projects)
app.use('/api/v1/tickets', tickets)

// Error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`.blue);
})


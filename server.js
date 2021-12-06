const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser')

dotenv.config({ path: './config/config.env' })

const app = express();

// Connect to database
connectDB();

// Body parser
app.use(express.json());

// CookieParser
app.use(cookieParser());

// Route files
const projects = require('./routes/projects');
const tickets = require('./routes/tickets');
const auth = require('./routes/auth');
const users = require('./routes/users');
const comments = require('./routes/comments');

// Mount routers
app.use('/api/v1/projects', projects)
app.use('/api/v1/tickets', tickets)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/comments', comments)

// Error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`.blue);
})


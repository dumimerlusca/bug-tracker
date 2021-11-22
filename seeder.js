const mongoose = require('mongoose');
const colors = require('colors');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

const Project = require('./models/Project');
const Ticket = require('./models/Ticket');


// Load data
const projects = JSON.parse(fs.readFileSync(`${__dirname}/_data/projects.json`, 'utf-8'));
const tickets = JSON.parse(fs.readFileSync(`${__dirname}/_data/tickets.json`, 'utf-8'));

// Connect to DB
connectDB();

const importData = async () => {
  try {
    await Project.create(projects);
    await Ticket.create(tickets);
    console.log('Data imported...'.green)
    process.exit();
  } catch (error) {
    console.log(error.message)
    process.exit();
  }
}

const deleteData = async () => {
  try {
    await Project.deleteMany();
    await Ticket.deleteMany();
    console.log('Data deleted...'.red)
    process.exit();
  } catch (error) {
    console.log(error.message)
    process.exit();
  }
}

if (process.argv[2] === '-i') {
  importData();
}

if (process.argv[2] === '-d') {
  deleteData();
}
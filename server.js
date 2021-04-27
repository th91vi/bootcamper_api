const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, message: 'Show all bootcamps'})
})

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, message: `Display bootcamp #${req.params.id}`})
})

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({success: true, message: 'Created new bootcamp'})
})

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, message: `Created bootcamp #${req.params.id}`})
})

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({success: true, message: `Deleted bootcamp (was #${req.params.id})`})
})

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

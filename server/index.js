const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect Database
connectDB()

// Routes
app.use('/api/auth', require('./routes/auth'))

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'PitchAI Server chal raha hai! 🚀' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`)
})
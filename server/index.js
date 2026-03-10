const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/pitch', require('./routes/pitch'))

app.get('/', (req, res) => {
  res.json({ message: 'PitchAI Server chal raha hai! 🚀' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`)
})
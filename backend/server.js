require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error:', err))

const app = express()
app.use(cors())
app.use(express.json())

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
})
const User = mongoose.model('User', userSchema)

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CalmHands Backend Running' })
})

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, name: user.name })
  } catch (err) {
    res.status(400).json({ message: 'Email already exists or invalid data' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: 'Wrong password' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, name: user.name })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.listen(5000, () => {
  console.log('Server running on port 5000')
})
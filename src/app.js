const express = require('express');
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const todoRoutes = require("./routes/todoRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()
const PORT = process.env.SERVER_PORT || 4000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Routes	
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const todoRoutes = require("./routes/todoRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()
const PORT = process.env.SERVER_PORT || 4000

var allowedOrigins = [
	"http://localhost:5173",
]

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true)
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin."
				return callback(new Error(msg), false)
			}
			return callback(null, true)
		},
	})
)

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


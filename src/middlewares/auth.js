const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: "Access denied", error: true })
  }
  try {
    const decoded = jwt.verify(token, process.env.SERVER_JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: "Invalid token" })
  }
}

module.exports = verifyToken

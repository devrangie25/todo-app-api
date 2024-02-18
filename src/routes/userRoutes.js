const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyToken = require("../middlewares/auth")

// Routes for users
router.get("/", verifyToken, userController.getAllUsers)
router.get("/users-todos", verifyToken, userController.getAllUsersTodos)

module.exports = router

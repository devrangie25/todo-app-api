const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todoController")
const verifyToken = require("../middlewares/auth")

// Routes for todos
router.post("/create-todo", verifyToken, todoController.createTodo)
router.get("/", verifyToken, todoController.fetchAllTodos)
router.get("/users-todos", verifyToken, todoController.fetchAllTodosWithUsers)

module.exports = router

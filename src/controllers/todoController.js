const db = require('../models')
const { Op } = require("sequelize");

const Todo = db['todo']
const User = db['user']

const createTodo = async (req, res) => {
  try {
    const { title, user_id } = req.body
    const createdUser = await Todo.create({
      title,
      user_id
    })
    res.status(200).json({
      message: "Todo created successfully",
      status: "success",
      data: createdUser,
    })
  } catch (error) {
    if (error.errors) {
      console.log("Validation Error in Registering User", error.errors[0].message)
      return res.status(500).json({
        message: error.errors[0].message,
        status: "error",
      })
    }
    console.log("ERROR - createTodo", error.message)
    res.status(500).json({
      message: error.message,
      status: "error",
    })
  }
}

const fetchAllTodosWithUsers = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'username'], // Specify the user attributes you want to include
      }],
    })
    res.status(200).json({
      message: "Todos with Users fetched successfully",
      status: 'success',
      data: todos,
    })
  } catch (error) {
    console.log('ERROR - fetchAllTodosWithUsers', error.message)
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

const fetchAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({})
    res.status(200).json({
      message: "Todos fetched successfully",
      status: 'success',
      data: todos,
    })
  } catch (error) {
    console.log('ERROR - fetchAllTodos', error.message)
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

module.exports = { createTodo, fetchAllTodosWithUsers, fetchAllTodos }

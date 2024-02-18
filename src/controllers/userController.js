const db = require('../models')
const { Op } = require("sequelize");
require('dotenv').config();

const User = db['user']
const Todo = db['todo']

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({})
    res.status(200).json({
      message: "Users fetched successfully",
      status: 'success',
      data: users,
    })
  } catch (error) {
    console.log('ERROR - getAllUsers', error.message)
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

const getAllUsersTodos = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Todo,
        as: 'user_todos',
        attributes: ['id', 'title', 'completed', 'date_set'], // Specify the user attributes you want to include
      }],
    })
    res.status(200).json({
      message: "Users with Todos fetched successfully",
      status: 'success',
      data: users,
    })
  } catch (error) {
    console.log('ERROR - getAllUsersTodos', error.message)
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

module.exports = {
  getAllUsers,
  getAllUsersTodos
}

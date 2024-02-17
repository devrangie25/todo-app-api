const jwt = require('jsonwebtoken');
const db = require('../models')
const bcrypt = require("bcrypt");
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

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body
    const createdUser = await User.create({ firstname, lastname, username, email, password })
    res.status(200).json({
      message: "User created successfully",
      status: 'success',
      data: createdUser,
    })
  } catch (error) {
    if (error.errors) {
      console.log('Validation Error in Registering User', error.errors[0].message)
      return res.status(500).json({
        message: error.errors[0].message,
        status: 'error',
      })
    }
    console.log('ERROR - registerUser', error.message)
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found', status: 'error' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password', status: 'error' })
    }

    const token = jwt.sign({ sub: usernameOrEmail }, process.env.SERVER_JWT_SECRET , { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successful",
      status: 'success',
      data: {
        access_token: token, token_type: 'Bearer', expires_in: 3600,
      },
    })

  } catch (error) {
    console.log('ERROR - loginUser', error.message)
    res.status(500).json({
      message: error.message,
      status: 'error',
    })
  }
}

module.exports = {
  getAllUsers,
  loginUser,
  registerUser,
  getAllUsersTodos
}

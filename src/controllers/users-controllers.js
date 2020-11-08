const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const User = require('../models/user')

const getUsers = async (req, res, next) => {
 
  let users

  try {
    users = await User.find({}, '-password')
  } catch(err) {
    const error = new HttpError('Fetching users failed', 500)
    return next(error)
  }

  res.json({users: users.map(u => u.toObject({ getters: true }))})
}

const signup = async (req, res, next) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError('Invalid inputs passed', 422)
  }

  const { name, email, image, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.', 500)
    return next(error)
  }

  if(existingUser) {
    const error = new HttpError('User exists already', 422)
    return next(error)
  }

  const createdUser = new User({
    name,
    email,
    image,
    password,
    items: []
  })

  try {
    await createdUser.save();
  } catch(err) {
    const error = new HttpError('Signing up failed, please try again', 500)
    return next(error)
  }

  res.status(201).json({user: createdUser.toObject({getters: true})})
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again later.', 500)
    return next(error)
  }

  if(!existingUser || existingUser.password !== password) {
    const error = new HttpError('Invalid credentials, please try again', 401)
    return next(error)
  }

  res.json({ message: "Logged in!" })
}

exports.getUsers = getUsers
exports.signup = signup
exports.login = login
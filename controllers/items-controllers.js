const fs = require('fs');

const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')
const Item = require('../models/item')
const User = require('../models/user');


const getItemById = async (req, res, next) => {
  const itemId = req.params.iid
  let item

  try {
    item = await Item.findById(itemId)
  } catch (err) {
    const error = new HttpError('Something went wrong, could not find an item.', 500)
    return next(error)
  }

  if(!item) {
    const error = new HttpError('Could not find an item with that ID', 404)
    return next(error)
  }

  res.json({ item: item.toObject({ getters: true }) })
}

const getItemsByUserId = async (req, res, next) => {
  const userId = req.params.uid
  let userWithItems

  try {
    userWithItems = await User.findById(userId).populate('items')

  } catch(err) {
    const error = new HttpError('Fetching items failed, please try again', 500)
    return next(error)
  }

  if(!userWithItems || userWithItems.items.length === 0) {
    return next(new HttpError('Could not find an item with that user ID', 404))
  }

  res.json({ items: userWithItems.items.map(i => i.toObject({ getters: true })) })
}

const createItem = async (req, res, next) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    console.log(errors)
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { title, description } = req.body

  const createdItem = new Item({
    title,
    description,
    image: req.file.path,
    owner: req.userData.userId,
    currentUser: req.userData.userId
  })

  let user

  try {
    user = await User.findById(req.userData.userId)
  } catch(err) {
    const error = new HttpError('Creating item failed, please try again', 500)
    return next(error)
  }

  if(!user) {
    const error = new HttpError('Could not find user with that ID', 404)
    return next(error)
  }


  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdItem.save({ session: sess })
    user.items.push(createdItem)
    await user.save({ session: sess })
    await sess.commitTransaction()
  } catch(err) {
    const error = new HttpError('Creating item failed, please try again', 500)
    return next(error)
  }

  try {
    await createdItem.save();
  } catch (err) {
    const error = new HttpError('Creating item failed, please try again.', 500);
    return next(error);
  }


  res.status(201).json({ item: createdItem })
}

const updateItem = async (req, res, next) => {
  
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError('Invalid inputs passed', 422)
  }
  
  const { title, description } = req.body
  const itemId = req.params.iid

  let item

  try {
    item = await Item.findById(itemId)
  } catch(err) {
    const error = new HttpError('Something went wrong, could not update item', 500)
    return next(error)
  }

  if(item.currentUser.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this item.', 401);
    return next(error);
  }

  item.title = title;
  item.description = description

  try {
    await item.save()
  } catch(err) {
    const error = new HttpError('Something went wrong, could not update item', 500)
    return next(error)
  }

  res.status(200).json({item: item.toObject({ getters: true })})
}

const deleteItem = async (req, res, next) => {
  const itemId = req.params.iid
  let item
  
  try {
    item = await Item.findById(itemId).populate('currentUser')
  } catch(err) {
    const error = new HttpError('Something went wrong, could not delete item', 500)
    return next(error)
  }

  if (!item) {
    const error = new HttpError('Could not find item for this id', 404)
    return next(error)
  }

  if (item.currentUser.id !== req.userData.userId) {
    const error = new HttpError('You are not allowed to delete this item.', 401);
    return next(error);
  }

  const imagePath = item.image;

  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await item.remove({session: sess})
    item.currentUser.items.pull(item)
    await item.currentUser.save({session: sess})
    await sess.commitTransaction()
    
  } catch(err) {
    const error = new HttpError('Something went wrong, could not delete item', 500)
    return next(error)
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });
    
  res.status(200).json({message: 'Deleted item'})
}


exports.getItemById = getItemById
exports.getItemsByUserId = getItemsByUserId
exports.createItem = createItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem
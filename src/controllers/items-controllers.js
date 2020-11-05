const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error')

let DUMMY_ITEMS = [
  {
    id: 'i1',
    title: 'Slagborr',
    description: 'En borr av slag',
    image: 'https://www.bauhaus.se/media/catalog/product/cache/9d0f0c8eb514963e1fda0eb95b4bf3ab/1/1/1167577a.jpg',
    owner: 'u1',
    currentUser: 'u1'
  }
]

const getItemById = (req, res, next) => {
  const itemId = req.params.iid;
  const item = DUMMY_ITEMS.find(i => i.id === itemId)

  if(!item) {
    return next(new HttpError('Could not find an item with that ID', 404))
  }

  res.json({ item })
}

const getItemsByUserId = (req, res, next) => {
  const userId = req.params.uid

  const items = DUMMY_ITEMS.filter(i => i.currentUser === userId)

  if(!items || items.length === 0) {
    const error = new HttpError('Could not find an item with that user ID', 404)
    return next(error)
  }

  res.json({ items })
}

const createItem = (req, res, next) => {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError('Invalid inputs passed', 422)
  }
  const { title, description, image, owner, currentUser } = req.body
  const createdItem = {
    id: uuid(),
    title,
    description,
    image,
    owner,
    currentUser
  }

  DUMMY_ITEMS.push(createdItem)

  res.status(201).json({ item: createdItem })
}

const updateItem = (req, res, next) => {
  
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    console.log(errors)
    throw new HttpError('Invalid inputs passed', 422)
  }
  
  const { title, description, image } = req.body
  const itemId = req.params.iid

  const updatedItem = { ...DUMMY_ITEMS.find(i => i.id === itemId)}
  const itemIndex = DUMMY_ITEMS.findIndex(i => i.id === itemId)

  updatedItem.title = title;
  updatedItem.description = description
  updatedItem.image = image

  DUMMY_ITEMS[itemIndex] = updatedItem

  res.status(200).json({item: updatedItem})
}

const deleteItem = (req, res, next) => {
  const itemId = req.params.iid

  if(!DUMMY_ITEMS.find(i => i.id === itemId)) {
    throw new HttpError('Could not find a place for that ID', 404)
  }

  DUMMY_ITEMS = DUMMY_ITEMS.filter(i => i.id !== itemId)
  res.status(200).json({message: 'Deleted item'})
}


exports.getItemById = getItemById
exports.getItemsByUserId = getItemsByUserId
exports.createItem = createItem
exports.updateItem = updateItem
exports.deleteItem = deleteItem
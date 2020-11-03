const HttpError = require('../models/http-error')

const DUMMY_ITEMS = [
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

const getItemByUserId = (req, res, next) => {
  const userId = req.params.uid

  const item = DUMMY_ITEMS.find(i => i.currentUser === userId)

  if(!item) {
    const error = new HttpError('Could not find an item with that user ID', 404)
    return next(error)
  }

  res.json({ item })
}

const createItem = (req, res, next) => {
  const { title, description, image, owner, currentUser } = req.body
  const createdItem = {
    title,
    description,
    image,
    owner,
    currentUser
  }

  DUMMY_ITEMS.push(createdItem)

  res.status(201).json({ item: createdItem })
}

exports.getItemById = getItemById
exports.getItemByUserId = getItemByUserId
exports.createItem = createItem
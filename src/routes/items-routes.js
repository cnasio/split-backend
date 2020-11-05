const express = require('express')
const { check } = require('express-validator')

const itemsControllers = require('../controllers/items-controllers')

const router = express.Router()


router.get('/:iid', itemsControllers.getItemById)
router.get('/user/:uid', itemsControllers.getItemsByUserId)

router.post('/', 
  [
    check('title').not().isEmpty(), 
    check('description').isLength({min: 5}), 
    check('image').not().isEmpty()
  ], 
  itemsControllers.createItem
)

router.patch('/:iid', 
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('image').not().isEmpty()
  ], 
  itemsControllers.updateItem
)

router.delete('/:iid', itemsControllers.deleteItem)

module.exports = router





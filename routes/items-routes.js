const express = require('express')
const { check } = require('express-validator')

const itemsControllers = require('../controllers/items-controllers')
const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');

const router = express.Router()


router.get('/:iid', itemsControllers.getItemById)
router.get('/user/:uid', itemsControllers.getItemsByUserId)

router.use(checkAuth);

router.post('/',
  fileUpload.single('image'),
  [
    check('title').not().isEmpty(), 
    check('description').isLength({min: 5}), 
  ], 
  itemsControllers.createItem
)

router.patch('/:iid', 
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
  ], 
  itemsControllers.updateItem
)

router.delete('/:iid', itemsControllers.deleteItem)

module.exports = router





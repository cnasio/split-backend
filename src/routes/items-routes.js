const express = require('express')

const itemsControllers = require('../controllers/items-controllers')

const router = express.Router()


router.get('/:iid', itemsControllers.getItemById)
router.get('/user/:uid', itemsControllers.getItemByUserId)
router.post('/', itemsControllers.createItem)

module.exports = router



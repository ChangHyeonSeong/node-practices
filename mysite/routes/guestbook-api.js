const express = require('express');
const controller = require('../controllers/guestbook-api');

const router = express.Router();
router.route('').get(controller.read);
router.route('').post(controller.create);
router.route('/:no').post(controller.delete);


module.exports = router
const express = require('express');
const controller = require('../controllers/gallery');
const authorized = require('./authorized');

const router = express.Router();
router.route('').get(controller.index);
router.route('/upload').post(authorized('ADMIN'), controller.upload);


module.exports = router
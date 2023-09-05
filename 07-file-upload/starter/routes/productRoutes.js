const express = require('express');
const router = express.Router();
const {uploadProduct,getAllProducts} = require('../controllers/productController');
const {uploadProductImageLocal} = require('../controllers/uploadsController');

router.route('/').post(uploadProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImageLocal);

module.exports = router;
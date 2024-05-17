const express = require('express');
const router = express.Router();
const multer = require('multer');

const productController = require('../../controllers/admin/productController');
const productValidation = require('../../validations/admin/productValidation');
const multerStorage = require('../../helpers/multerStorage');
const upload = multer({ storage: multerStorage() });

router.get('/', productController.index);

router.patch('/change-status/:status/:id', productController.changeStatus);
router.patch('/change-multi', productController.changeMulti);

router.delete('/delete/:id', productController.deleteItem);

router.get('/create', productController.pageCreate);
router.post(
    '/create',
    upload.single('thumbnail'),
    productValidation.createNew,
    productController.createProduct
);

module.exports = router;

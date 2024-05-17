const express = require('express');
const router = express.Router();
const multer = require('multer');

const controller = require('../../controllers/admin/product.controller');
const multerStorage = require('../../helpers/multerStorage');
const upload = multer({ storage: multerStorage() });

router.get('/', controller.index);

router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.pageCreate);
router.post('/create', upload.single('thumbnail'), controller.createProduct);

module.exports = router;

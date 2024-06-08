const productCategoryModel = require('../../models/productCategoryModel');
const createTreeHelper = require('../../helpers/createTree');
const system = require('../../config/system.js');

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    try {
        const find = {
            deleted: false,
        };

        const productCategory = await productCategoryModel.find(find);
        const newRecords = createTreeHelper(productCategory);

        res.render('admin/pages/products-category/index', {
            pageTitle: 'Danh mục sản phẩm',
            productCategory: newRecords,
        });
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/products-category`);
    }
};

// [GET] /admin/products-category/create
module.exports.pageCreate = async (req, res) => {
    try {
        const find = {
            deleted: false,
        };

        const records = await productCategoryModel.find(find);

        const newRecords = createTreeHelper(records);

        res.render('admin/pages/products-category/create', {
            pageTitle: 'Tạo danh mục',
            records: newRecords,
        });
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/products-category`);
    }
};

// [POST] /admin/products-category/create
module.exports.create = async (req, res) => {
    try {
        const data = req.body;
        if (data.position == '') {
            const countProduct = await productCategoryModel.countDocuments();
            data.position = parseInt(countProduct + 1);
        } else {
            data.position = parseInt(data.position);
        }

        // console.log(data);
        const product = new productCategoryModel(data);
        await product.save();

        res.redirect('back');
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/products-category`);
    }
};

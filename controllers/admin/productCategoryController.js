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
        // Create By
        data.createBy = {
            account_id: res.locals.user.id,
        };

        // console.log(data);
        const product = new productCategoryModel(data);
        await product.save();

        res.redirect('back');
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/products-category`);
    }
};

// [GET] /admin/products-category/edit:id
module.exports.pageEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const productCategory = await productCategoryModel.findOne({
            _id: id,
            deleted: false,
        });

        const records = await productCategoryModel.find({
            deleted: false,
        });

        const newRecords = createTreeHelper(records);

        res.render('admin/pages/products-category/edit.pug', {
            pageTitle: 'Trang chỉnh sửa',
            productCategory: productCategory,
            records: newRecords,
        });
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/products-category`);
    }
};

// [PATCH] /admin/products-category/edit:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        data.position = parseInt(data.position);

        await productCategoryModel.updateOne(
            {
                _id: id,
            },
            data
        );

        req.flash('success', 'Cập nhật danh mục thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật danh mục thất bại!');
    }
    res.redirect('back');
};

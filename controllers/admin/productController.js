const productModel = require('../../models/productModel.js');
const productCategoryModel = require('../../models/productCategoryModel.js');
const accountModel = require('../../models/accountModel');

const filterStatusHelper = require('../../helpers/filterStatus.js');
const searchHelper = require('../../helpers/search.js');
const paginationHelper = require('../../helpers/pagination.js');
const createTreeHelper = require('../../helpers/createTree.js');
const system = require('../../config/system.js');

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const filterButton = filterStatusHelper(req);

    let find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    const objectSearch = searchHelper(req);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    const totalProduct = await productModel.countDocuments();
    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitProduct: 5,
        },
        req,
        totalProduct
    );

    const sort = {};

    if (req.query.sortby) {
        const [key, value] = req.query.sortby.split('_');
        sort[key] = value;
    } else {
        sort.position = 'desc';
    }

    const products = await productModel
        .find(find)
        .sort(sort)
        .limit(objectPagination.limitProduct)
        .skip(objectPagination.skip);

    for (const product of products) {
        const user = await accountModel.findOne({
            _id: product.createBy.account_id,
        });

        if (user) {
            product.accountFullName = user.fullName;
        }
    }

    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        filterButton: filterButton,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    await productModel.updateOne({ _id: id }, { status: status });

    req.flash('success', 'Đổi trạng thái sản phẩm thành công!');

    res.redirect('back');
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', ');

    switch (type) {
        case 'active':
            await productModel.updateMany(
                {
                    _id: { $in: ids },
                },
                { status: type }
            );

            req.flash(
                'success',
                `Đổi trạng thái ${ids.length} sản phẩm thành công!`
            );

            break;

        case 'inactive':
            await productModel.updateMany(
                {
                    _id: { $in: ids },
                },
                { status: type }
            );

            req.flash(
                'success',
                `Đổi trạng thái ${ids.length} sản phẩm thành công!`
            );

            break;

        case 'delete':
            await productModel.updateMany(
                {
                    _id: { $in: ids },
                },
                {
                    deleted: true,
                    deletedAt: new Date(),
                }
            );

            req.flash('success', `Xóa ${ids.length} sản phẩm thành công!`);

            break;

        case 'position':
            for (const item of ids) {
                const [id, position] = item.split('-');
                await productModel.updateOne(
                    {
                        _id: id,
                    },
                    {
                        position: position,
                    }
                );
            }

            req.flash(
                'success',
                `Đổi vị trí ${ids.length} sản phẩm thành công!`
            );

            break;
        default:
            break;
    }

    res.redirect('back');
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await productModel.deleteOne({
    //     _id: id,
    // });

    await productModel.updateOne(
        {
            _id: id,
        },
        {
            deleted: true,
            createBy: {
                account_id: res.locals.user.id,
                createAt: new Date(),
            },
        }
    );

    req.flash('success', `Xóa sản phẩm thành công!`);

    res.redirect('back');
};

// [GET] /admin/products/create
module.exports.pageCreate = async (req, res) => {
    const records = await productCategoryModel.find({
        deleted: false,
    });
    const newRecords = createTreeHelper(records);

    res.render('admin/pages/product/create', {
        pageTitle: 'Thêm mới sản phẩm',
        records: newRecords,
    });
};

// [POST] /admin/products/create
module.exports.createProduct = async (req, res) => {
    const data = req.body;
    data.price = parseInt(data.price);
    data.discountPercentage = parseInt(data.discountPercentage);
    data.stock = parseInt(data.stock);
    if (data.position == '') {
        const countProduct = await productModel.countDocuments();
        data.position = parseInt(countProduct + 1);
    } else {
        data.position = parseInt(data.position);
    }

    // Create By
    data.createBy = {
        account_id: res.locals.user.id,
    };

    const product = new productModel(data);
    await product.save();

    res.redirect('back');
};

// [GET] /admin/products/edit/:id
module.exports.pageEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const find = {
            _id: id,
            deleted: false,
        };

        const records = await productCategoryModel.find({
            deleted: false,
        });
        const newRecords = createTreeHelper(records);

        const product = await productModel.findOne(find);
        res.render('admin/pages/product/edit', {
            product: product,
            records: newRecords,
        });
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/products`);
    }
};

// [PATCH] /admin/products/edit/:id
module.exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        data.price = parseInt(data.price);
        data.discountPercentage = parseInt(data.discountPercentage);
        data.stock = parseInt(data.stock);

        data.position = parseInt(data.position);

        await productModel.updateOne(
            {
                _id: id,
            },
            data
        );

        req.flash('success', 'Cập nhật sản phẩm thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật sản phẩm thất bại!');
    }
    res.redirect('back');
};

// [GET] /admin/products/detail/:id
module.exports.detailProduct = async (req, res) => {
    const id = req.params.id;
    const find = {
        _id: id,
        deleted: false,
    };

    const product = await productModel.findOne(find);
    res.render('./admin/pages/product/detail.pug', {
        product: product,
    });
};

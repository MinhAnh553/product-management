const productModel = require('../../models/productModel.js');
const filterStatusHelper = require('../../helpers/filterStatus.js');
const searchHelper = require('../../helpers/search.js');
const paginationHelper = require('../../helpers/pagination.js');

// [GET] /admin/product
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

    const products = await productModel
        .find(find)
        .sort({ position: 'desc' })
        .limit(objectPagination.limitProduct)
        .skip(objectPagination.skip);

    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        filterButton: filterButton,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
};

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    await productModel.updateOne({ _id: id }, { status: status });

    req.flash('success', 'Đổi trạng thái sản phẩm thành công!');

    res.redirect('back');
};

// [PATCH] /admin/product/change-multi
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

// [DELETE] /admin/product/delete/:id
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
            deletedAt: new Date(),
        }
    );

    req.flash('success', `Xóa sản phẩm thành công!`);

    res.redirect('back');
};

// [GET] /admin/product/create
module.exports.pageCreate = (req, res) => {
    res.render('admin/pages/product/create');
};

// [POST] /admin/product/create
module.exports.createProduct = async (req, res) => {
    const data = req.body;
    data.price = parseInt(data.price);
    data.discountPercentage = parseInt(data.discountPercentage);
    data.stock = parseInt(data.stock);
    if (req.file) {
        data.thumbnail = `/uploads/${req.file.filename}`;
    }
    if (data.position == '') {
        const countProduct = await productModel.countDocuments();
        data.position = parseInt(countProduct + 1);
    } else {
        data.position = parseInt(data.position);
    }

    const product = new productModel(data);
    await product.save();

    res.redirect('back');
};

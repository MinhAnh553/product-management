const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
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

    const totalProduct = await Product.countDocuments();
    const objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitProduct: 5,
        },
        req,
        totalProduct
    );

    const products = await Product.find(find)
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

    await Product.updateOne({ _id: id }, { status: status });

    res.redirect('back');
};

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', ');

    switch (type) {
        case 'active':
            await Product.updateMany(
                {
                    _id: { $in: ids },
                },
                { status: type }
            );
            break;

        case 'inactive':
            await Product.updateMany(
                {
                    _id: { $in: ids },
                },
                { status: type }
            );
            break;

        case 'delete':
            await Product.updateMany(
                {
                    _id: { $in: ids },
                },
                {
                    deleted: true,
                    deletedAt: new Date(),
                }
            );
            break;

        default:
            break;
    }

    res.redirect('back');
};

// [DELETE] /admin/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Product.deleteOne({
    //     _id: id,
    // });

    await Product.updateOne(
        {
            _id: id,
        },
        {
            deleted: true,
            deletedAt: new Date(),
        }
    );

    res.redirect('back');
};

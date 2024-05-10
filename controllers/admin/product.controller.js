const Product = require('../../models/product.model');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');

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

    const products = await Product.find(find);

    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        filterButton: filterButton,
        keyword: objectSearch.keyword,
    });
};

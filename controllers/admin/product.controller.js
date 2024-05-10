const Product = require('../../models/product.model');
const filterStatus = require('../../helpers/filterStatus');

// [GET] /admin/product
module.exports.index = async (req, res) => {
    const filterButton = filterStatus(req);

    let find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    let keyword = '';
    if (req.query.keyword) {
        keyword = req.query.keyword;
        const regex = new RegExp(keyword, 'i');
        find.title = regex;
    }

    const products = await Product.find(find);

    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        filterButton: filterButton,
        keyword: keyword,
    });
};

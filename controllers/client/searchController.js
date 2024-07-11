const search = require('../../helpers/search');
const productModel = require('../../models/productModel');

module.exports.search = async (req, res) => {
    const result = search(req);

    const products = await productModel.find({
        title: result.regex,
        status: 'active',
        deleted: false,
    });

    res.render('client/pages/search/index', {
        pageTitle: 'Kết quả tìm kiếm',
        products: products,
        keyword: result.keyword,
    });
};

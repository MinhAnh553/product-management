const productModel = require('../../models/productModel');
const productHelper = require('../../helpers/product');

// [GET] /
module.exports.index = async (req, res) => {
    const productFeatured = await productModel
        .find({
            featured: '1',
            deleted: false,
            status: 'active',
        })
        .limit(6);

    const newProducts = productHelper.priceNew(productFeatured);

    res.render('client/pages/home/index', {
        pageTitle: 'Trang chủ',
        productFeatured: newProducts,
    });
};

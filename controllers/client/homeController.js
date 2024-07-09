const productModel = require('../../models/productModel');
const productHelper = require('../../helpers/product');

// [GET] /
module.exports.index = async (req, res) => {
    const productsFeatured = await productModel
        .find({
            featured: '1',
            deleted: false,
            status: 'active',
        })
        .limit(6);

    const featuredProducts = productHelper.priceNew(productsFeatured);

    const newProducts = await productModel
        .find({
            deleted: false,
            status: 'active',
        })
        .sort({ position: 'desc' })
        .limit(6);

    const newProducts2 = productHelper.priceNew(newProducts);

    res.render('client/pages/home/index', {
        pageTitle: 'Trang chủ',
        productFeatured: featuredProducts,
        newProducts: newProducts2,
    });
};

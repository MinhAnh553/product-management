const Product = require('../../models/product.model');

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: 'active',
        deleted: false,
    }).sort({ position: 'desc' });

    const newProducts = products.map((item) => {
        item.priceNew = (
            ((100 - item.discountPercentage) * item.price) /
            100
        ).toFixed(0);
        return item;
    });

    res.render('client/pages/products/index', {
        pageTitle: 'Trang sản phẩm',
        products: newProducts,
    });
};

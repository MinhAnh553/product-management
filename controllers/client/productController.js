const productModel = require('../../models/productModel');
const productHelper = require('../../helpers/product');

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await productModel
        .find({
            status: 'active',
            deleted: false,
        })
        .sort({ position: 'desc' });

    const newProducts = productHelper.priceNew(products);

    res.render('client/pages/products/index', {
        pageTitle: 'Trang sản phẩm',
        products: newProducts,
    });
};

// [GET] /products/:slug
module.exports.detailProduct = async (req, res) => {
    try {
        const slug = req.params.slug;
        const find = {
            slug: slug,
            deleted: false,
            status: 'active',
        };
        const product = await productModel.findOne(find);

        res.render('./client/pages/products/detail.pug', {
            pageTitle: product.title,
            product: product,
        });
    } catch (error) {
        res.redirect('/products');
    }
};

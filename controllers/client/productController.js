const productModel = require('../../models/productModel');
const productCategoryModel = require('../../models/productCategoryModel');
const productHelper = require('../../helpers/product');
const productCategoryHelper = require('../../helpers/productCategory');

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

// [GET] /products/:slugCategory
module.exports.categoryPage = async (req, res) => {
    const slug = req.params.slugCategory;

    const category = await productCategoryModel.findOne({
        slug: slug,
        deleted: false,
        status: 'active',
    });

    // get all children in category
    const allCategory = await productCategoryHelper.getChildren(category.id);

    const listCategoryId = allCategory.map((item) => item.id);

    const products = await productModel
        .find({
            category: { $in: [category.id, ...listCategoryId] },
            status: 'active',
            deleted: false,
        })
        .sort({ position: 'desc' });

    const newProducts = productHelper.priceNew(products);

    res.render('client/pages/products/index', {
        pageTitle: category.title,
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

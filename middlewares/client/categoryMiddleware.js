const productCategoryModel = require('../../models/productCategoryModel');
const createTree = require('../../helpers/createTree');

module.exports = async (req, res, next) => {
    const productCategory = await productCategoryModel.find({
        deleted: false,
    });

    const newProductCategory = createTree(productCategory);

    res.locals.layoutProductCategory = newProductCategory;

    next();
};

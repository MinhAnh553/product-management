const productCategoryModel = require('../models/productCategoryModel');

module.exports.getChildren = async (parentId) => {
    const getChildrenCategory = async (parentId) => {
        const categorys = await productCategoryModel.find({
            parent_id: parentId,
            deleted: false,
            status: 'active',
        });

        let allChildren = [...categorys];

        for (const category of categorys) {
            const childrenCategory = await getChildrenCategory(category.id);
            allChildren = allChildren.concat(childrenCategory);
        }

        return allChildren;
    };

    const result = await getChildrenCategory(parentId);
    return result;
};

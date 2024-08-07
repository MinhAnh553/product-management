const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: '',
        },
        description: String,
        slug: { type: String, slug: 'title', unique: true },
        thumbnail: String,
        status: String,
        position: Number,
        createBy: {
            account_id: String,
            createAt: {
                type: Date,
                default: Date.now,
            },
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const ProductCategory = mongoose.model(
    'ProductCategory',
    productCategorySchema,
    'products_category'
);

module.exports = ProductCategory;

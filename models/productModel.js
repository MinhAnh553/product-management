const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {
        title: String,
        category: {
            type: String,
            default: '',
        },
        description: String,
        featured: String,
        slug: { type: String, slug: 'title', unique: true },
        price: Number,
        discountPercentage: Number,
        stock: Number,
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
        updateBy: [
            {
                account_id: String,
                updateAt: Date,
            },
        ],
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedBy: {
            account_id: String,
            deletedAt: Date,
        },
        // deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;

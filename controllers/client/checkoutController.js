const cartModel = require('../../models/cartModel');
const productModel = require('../../models/productModel');
const orderModel = require('../../models/orderModel');
const productHelper = require('../../helpers/product');

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cart = await cartModel.findOne({
        _id: req.cookies.cartId,
    });

    if (cart && cart.products.length > 0) {
        for (const product of cart.products) {
            const productInfo = await productModel.findOne({
                _id: product.product_id,
                status: 'active',
                deleted: false,
            });

            productInfo.priceNew = productHelper.priceNewOne(productInfo);

            product.total = productInfo.priceNew * product.quantity;
            product.productInfo = productInfo;
        }
    } else {
        res.redirect('/products');
        return;
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.total, 0);

    res.render('client/pages/checkout', {
        pageTitle: 'Đặt hàng',
        cart: cart,
    });
};

// [GET] /checkout/order
module.exports.order = async (req, res) => {
    const cart_id = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await cartModel.findOne({
        _id: cart_id,
    });

    let products = [];
    for (const product of cart.products) {
        const productInfo = await productModel.findOne({
            _id: product.product_id,
        });

        products.push({
            product_id: product.product_id,
            price: productInfo.price,
            discountPercentage: productInfo.discountPercentage,
            quantity: product.quantity,
        });

        await productModel.updateOne(
            {
                _id: product.product_id,
            },
            {
                stock: productInfo.stock - product.quantity,
            }
        );
    }
    const objectOrder = {
        cart_id: cart_id,
        userInfo: userInfo,
        produts: products,
    };

    const order = new orderModel(objectOrder);
    await order.save();

    await cartModel.updateOne(
        {
            _id: cart_id,
        },
        {
            products: [],
        }
    );

    res.redirect(`/checkout/success/${order.id}`);
};

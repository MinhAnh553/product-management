const cartModel = require('../../models/cartModel');

module.exports = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = new cartModel();
        await cart.save();

        const expiresTime = 1000 * 60 * 60 * 24 * 365;

        res.cookie('cartId', cart.id, {
            expires: new Date(Date.now() + expiresTime),
        });
    } else {
        // Có giỏ hàng
        const cart = await cartModel.findOne({
            _id: req.cookies.cartId,
        });

        cart.totalQuantity = cart.products.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        res.locals.miniCart = cart;
    }
    next();
};

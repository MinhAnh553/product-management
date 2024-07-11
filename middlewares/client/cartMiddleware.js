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
        // co gio hang roi
    }

    next();
};

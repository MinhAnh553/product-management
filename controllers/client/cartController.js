const cartModel = require('../../models/cartModel');

// [GET] /cart/add/:idProduct
module.exports.addProduct = async (req, res) => {
    const idProduct = req.params.idProduct;
    const quantity = parseInt(req.body.quantity);
    const idCart = req.cookies.cartId;

    const cart = await cartModel.findOne({
        _id: idCart,
    });

    // Xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const exitsProductInCart = cart.products.find(
        (item) => item.product_id == idProduct
    );

    if (exitsProductInCart) {
        const newQuantity = quantity + exitsProductInCart.quantity;

        await cartModel.updateOne(
            {
                _id: idCart,
                'products.product_id': idProduct,
            },
            {
                'products.$.quantity': newQuantity,
            }
        );
    } else {
        const objectCart = {
            product_id: idProduct,
            quantity: quantity,
        };

        await cartModel.updateOne(
            {
                _id: idCart,
            },
            {
                $push: { products: objectCart },
            }
        );
    }

    req.flash('success', 'Thêm sản phẩm vào giỏ hàng thành công!');
    res.redirect('back');
};

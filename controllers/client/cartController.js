const cartModel = require('../../models/cartModel');
const productModel = require('../../models/productModel');
const productHelper = require('../../helpers/product');

// [GET] /cart
module.exports.cartPage = async (req, res) => {
    const cart = await cartModel.findOne({
        _id: req.cookies.cartId,
    });

    if (cart.products.length > 0) {
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
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.total, 0);

    res.render('client/pages/cart/index', {
        pageTitle: 'Giỏ hàng',
        cart: cart,
    });
};

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

// [GET] /cart/delete/:idProduct
module.exports.deleteProduct = async (req, res) => {
    const productId = req.params.idProduct;
    const cartId = req.cookies.cartId;

    await cartModel.updateOne(
        {
            _id: cartId,
        },
        {
            $pull: { products: { product_id: productId } },
        }
    );

    req.flash('success', 'Đã xóa sản phẩm ra khỏi giỏ hàng!');

    res.redirect('back');
};

// [GET] /cart/update/:idProduct/:quantity
module.exports.updateQuantity = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.idProduct;
    const quantity = req.params.quantity;

    await cartModel.updateOne(
        {
            _id: cartId,
            'products.product_id': productId,
        },
        {
            'products.$.quantity': quantity,
        }
    );

    req.flash('success', 'Cập nhật số lượng thành công!');

    res.redirect('back');
};

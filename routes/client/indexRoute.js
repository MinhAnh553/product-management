const homeRoute = require('./homeRoute');
const productRoute = require('./productRoute');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware');
const searchRoute = require('./searchRoute');
const cartRoute = require('./cartRoute');
const cartMiddleware = require('../../middlewares/client/cartMiddleware');
const checkoutRoute = require('./checkoutRoute');
const userRoute = require('./userRoute');

module.exports = (app) => {
    app.use(categoryMiddleware);

    app.use(cartMiddleware);

    app.use('/', homeRoute);

    app.use('/products', productRoute);

    app.use('/search', searchRoute);

    app.use('/cart', cartRoute);

    app.use('/checkout', checkoutRoute);

    app.use('/user', userRoute);
};

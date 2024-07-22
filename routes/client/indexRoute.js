const homeRoute = require('./homeRoute');
const productRoute = require('./productRoute');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware');
const searchRoute = require('./searchRoute');
const cartRoute = require('./cartRoute');
const cartMiddleware = require('../../middlewares/client/cartMiddleware');
const checkoutRoute = require('./checkoutRoute');
const userRoute = require('./userRoute');
const userMiddleware = require('../../middlewares/client/userMiddleware');
const chatRoute = require('./chatRoute');
const authMiddleware = require('../../middlewares/client/authMiddleware');
const usersRoute = require('./usersRoute');

module.exports = (app) => {
    app.use(categoryMiddleware);

    app.use(cartMiddleware);

    app.use(userMiddleware.infoUser);

    app.use('/', homeRoute);

    app.use('/products', productRoute);

    app.use('/search', searchRoute);

    app.use('/cart', cartRoute);

    app.use('/checkout', checkoutRoute);

    app.use('/user', userRoute);

    app.use('/users', usersRoute);

    app.use('/chat', authMiddleware, chatRoute);
};

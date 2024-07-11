const homeRoute = require('./homeRoute');
const productRoute = require('./productRoute');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware');
const searchRoute = require('./searchRoute');

module.exports = (app) => {
    app.use(categoryMiddleware);

    app.use('/', homeRoute);

    app.use('/products', productRoute);

    app.use('/search', searchRoute);
};

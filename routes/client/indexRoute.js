const homeRoute = require('./homeRoute');
const productRoute = require('./productRoute');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware');

module.exports = (app) => {
    app.use(categoryMiddleware);

    app.use('/', homeRoute);

    app.use('/products', productRoute);
};

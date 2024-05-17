const homeRoute = require('./homeRoute');
const productRoute = require('./productRoute');

module.exports = (app) => {
    app.use('/', homeRoute);

    app.use('/products', productRoute);
};

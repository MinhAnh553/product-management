const dashboardRoute = require('./dashboardRoute');
const productRoute = require('./productRoute');
const productCategoryRoute = require('./productCategoryRoute');
const roleRoute = require('./roleRoute');
const accountRoute = require('./accountRoute');
const authRoute = require('./authRoute');
const systemConfig = require('../../config/system');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', dashboardRoute);
    app.use(PATH_ADMIN + '/products', productRoute);
    app.use(PATH_ADMIN + '/products-category', productCategoryRoute);
    app.use(PATH_ADMIN + '/roles', roleRoute);
    app.use(PATH_ADMIN + '/accounts', accountRoute);
    app.use(PATH_ADMIN + '/auth', authRoute);
};

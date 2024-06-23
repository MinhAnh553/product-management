const authMiddleware = require('../../middlewares/authMiddleware');

const dashboardRoute = require('./dashboardRoute');
const productRoute = require('./productRoute');
const productCategoryRoute = require('./productCategoryRoute');
const roleRoute = require('./roleRoute');
const accountRoute = require('./accountRoute');
const authRoute = require('./authRoute');
const systemConfig = require('../../config/system');

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(
        PATH_ADMIN + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRoute
    );
    app.use(PATH_ADMIN + '/products', authMiddleware.requireAuth, productRoute);
    app.use(
        PATH_ADMIN + '/products-category',
        authMiddleware.requireAuth,
        productCategoryRoute
    );
    app.use(PATH_ADMIN + '/roles', authMiddleware.requireAuth, roleRoute);
    app.use(PATH_ADMIN + '/accounts', authMiddleware.requireAuth, accountRoute);
    app.use(PATH_ADMIN + '/auth', authRoute);
};

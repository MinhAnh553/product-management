const accountModel = require('../models/accountModel');
const roleModel = require('../models/roleModel');
const system = require('../config/system');

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        const user = await accountModel
            .findOne({
                token: token,
                deleted: false,
            })
            .select('-password');
        if (user) {
            const role = await roleModel.findOne({
                _id: user.role_id,
            });

            res.locals.user = user;
            res.locals.role = role;
            next();
        } else {
            res.redirect(`${system.prefixAdmin}/auth/login`);
        }
    } else {
        res.redirect(`${system.prefixAdmin}/auth/login`);
    }
};

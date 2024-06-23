const accountModel = require('../models/accountModel');
const system = require('../config/system');

module.exports.requireAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        const user = accountModel.findOne({
            token: token,
            deleted: false,
        });
        if (user) {
            next();
        } else {
            res.redirect(`${system.prefixAdmin}/auth/login`);
        }
    } else {
        res.redirect(`${system.prefixAdmin}/auth/login`);
    }
};

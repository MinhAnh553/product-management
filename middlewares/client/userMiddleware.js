const userModel = require('../../models/userModel');

module.exports.infoUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await userModel
            .findOne({
                tokenUser: req.cookies.tokenUser,
            })
            .select('-password');

        res.locals.user = user;
    }
    next();
};

const userModel = require('../../models/userModel');

module.exports.infoUser = async (req, res, next) => {
    if (req.cookies.tokenUser) {
        const user = await userModel
            .findOne({
                tokenUser: req.cookies.tokenUser,
                status: 'active',
                deleted: false,
            })
            .select('-password');

        res.locals.user = user;
    }
    next();
};

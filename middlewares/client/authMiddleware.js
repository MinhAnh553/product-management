const userModel = require('../../models/userModel');

module.exports = async (req, res, next) => {
    const tokenUser = req.cookies.tokenUser;
    if (tokenUser) {
        const user = await userModel
            .findOne({
                tokenUser: tokenUser,
                deleted: false,
                status: 'active',
            })
            .select('-password');
        if (!user) {
            res.redirect(`/user/login`);
        } else {
            next();
        }
    } else {
        res.redirect(`/user/login`);
    }
};

const userModel = require('../../models/userModel');

module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;
    const users = await userModel.find({
        _id: { $ne: userId },
        status: 'active',
        deleted: false,
    });

    res.render('client/pages/users/not-friend', {
        pageTitle: 'Danh sách người dùng',
        users: users,
    });
};

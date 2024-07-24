const userModel = require('../../models/userModel');
const usersSocket = require('../../sockets/client/usersSocket');

// [GET] /users/not-friend
module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;

    // Socket
    usersSocket(userId);
    //End Socket
    const userA = await userModel.findOne({
        _id: userId,
        status: 'active',
        deleted: false,
    });

    let listFriend = [];
    for (const friend of userA.friendList) {
        listFriend.push(friend.user_id);
    }
    const users = await userModel
        .find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: userA.requestFriends } },
                { _id: { $nin: userA.acceptFriends } },
                { _id: { $nin: listFriend } },
            ],
            status: 'active',
            deleted: false,
        })
        .select('fullName avatar');

    res.render('client/pages/users/not-friend', {
        pageTitle: 'Danh sách người dùng',
        users: users,
    });
};

// [GET] /users/request
module.exports.request = async (req, res) => {
    const userId = res.locals.user.id;

    // Socket
    usersSocket(userId);
    //End Socket

    const userA = await userModel.findOne({
        _id: userId,
        status: 'active',
        deleted: false,
    });

    const users = await userModel
        .find({
            _id: { $in: userA.requestFriends },
            status: 'active',
            deleted: false,
        })
        .select('fullName avatar');

    res.render('client/pages/users/request', {
        pageTitle: 'Lời mời đã gửi',
        users: users,
    });
};

// [GET] /users/accept
module.exports.accept = async (req, res) => {
    const userId = res.locals.user.id;

    // Socket
    usersSocket(userId);
    //End Socket

    const userA = await userModel.findOne({
        _id: userId,
        status: 'active',
        deleted: false,
    });

    const users = await userModel
        .find({
            _id: { $in: userA.acceptFriends },
            status: 'active',
            deleted: false,
        })
        .select('fullName avatar');

    res.render('client/pages/users/accept', {
        pageTitle: 'Lời mời kết bạn',
        users: users,
    });
};

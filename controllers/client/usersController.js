const userModel = require('../../models/userModel');

module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;
    // Socket
    _io.once('connection', (socket) => {
        socket.on('CLIENT_ADD_FRIEND', async (idFriend) => {
            // Thêm id của A vào acceptFriends của B
            await userModel.updateOne(
                {
                    _id: idFriend,
                    acceptFriends: { $ne: userId },
                    status: 'active',
                    deleted: false,
                },
                {
                    $push: { acceptFriends: userId },
                }
            );

            // Thêm id của B vào requestFriends của A
            await userModel.updateOne(
                {
                    _id: userId,
                    requestFriends: { $ne: idFriend },
                    status: 'active',
                    deleted: false,
                },
                {
                    $push: { requestFriends: idFriend },
                }
            );
        });
    });
    const userA = await userModel.findOne({
        _id: userId,
        status: 'active',
        deleted: false,
    });

    const users = await userModel
        .find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: userA.requestFriends } },
                { _id: { $nin: userA.acceptFriends } },
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

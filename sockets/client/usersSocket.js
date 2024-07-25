const userModel = require('../../models/userModel');

module.exports = async (userId) => {
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

            // SERVER_RETURN_USER_ACCEPT
            const userA = await userModel
                .findOne({
                    _id: userId,
                    status: 'active',
                    deleted: false,
                })
                .select('fullName avatar');

            const userB = await userModel.findOne({
                _id: idFriend,
                status: 'active',
                deleted: false,
            });

            const listAcceptLength = userB.acceptFriends.length;

            socket.broadcast.emit('SERVER_RETURN_USER_ACCEPT', {
                user_id: idFriend,
                listAcceptLength: listAcceptLength,
                userRequest: userA,
                type: 'add',
            });
        });

        socket.on('CLIENT_CANCEL_FRIEND', async (idFriend) => {
            // Xóa id của A trong acceptFriends của B
            await userModel.updateOne(
                {
                    _id: idFriend,
                    status: 'active',
                    deleted: false,
                },
                {
                    $pull: { acceptFriends: userId },
                }
            );

            // Xóa id của B trong requestFriends của A
            await userModel.updateOne(
                {
                    _id: userId,
                    status: 'active',
                    deleted: false,
                },
                {
                    $pull: { requestFriends: idFriend },
                }
            );

            // SERVER_RETURN_USER_ACCEPT
            const userA = await userModel
                .findOne({
                    _id: userId,
                    status: 'active',
                    deleted: false,
                })
                .select('fullName avatar');

            const userB = await userModel.findOne({
                _id: idFriend,
                status: 'active',
                deleted: false,
            });

            const listAcceptLength = userB.acceptFriends.length;

            socket.broadcast.emit('SERVER_RETURN_USER_ACCEPT', {
                user_id: idFriend,
                listAcceptLength: listAcceptLength,
                userRequest: userA,
                type: 'cancel',
            });
        });

        socket.on('CLIENT_REFUSE_FRIEND', async (idFriend) => {
            // Xóa id của A trong acceptFriends của B
            await userModel.updateOne(
                {
                    _id: userId,
                    status: 'active',
                    deleted: false,
                },
                {
                    $pull: { acceptFriends: idFriend },
                }
            );

            // Xóa id của B trong requestFriends của A
            await userModel.updateOne(
                {
                    _id: idFriend,
                    status: 'active',
                    deleted: false,
                },
                {
                    $pull: { requestFriends: userId },
                }
            );
        });

        socket.on('CLIENT_ACCEPT_FRIEND', async (idFriend) => {
            // Thêm (user_id, room_chat_id) của A vào friendsList của B
            // Xóa id của A trong acceptFriends của B
            await userModel.updateOne(
                {
                    _id: userId,
                    status: 'active',
                    deleted: false,
                },
                {
                    $push: {
                        friendList: {
                            user_id: idFriend,
                            room_chat: 'none',
                        },
                    },
                    $pull: { acceptFriends: idFriend },
                }
            );

            // Thêm (user_id, room_chat_id) của B vào friendsList của A
            // Xóa id của B trong requestFriends của A
            await userModel.updateOne(
                {
                    _id: idFriend,
                    status: 'active',
                    deleted: false,
                },
                {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat: 'none',
                        },
                    },
                    $pull: { requestFriends: userId },
                }
            );
        });
    });
};

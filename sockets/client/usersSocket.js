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
        });
    });
};

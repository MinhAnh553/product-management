const chatModel = require('../../models/chatModel');
const userModel = require('../../models/userModel');

// [GET] /chat
module.exports.index = async (req, res) => {
    _io.once('connection', (socket) => {
        socket.on('CLIENT_SEND_MESSAGE', async (content) => {
            const chat = new chatModel({
                user_id: res.locals.user.id,
                content: content,
            });
            await chat.save();
        });
    });

    const chats = await chatModel.find({
        deleted: false,
    });

    if (chats) {
        for (const chat of chats) {
            const user = await userModel
                .findOne({
                    _id: chat.user_id,
                    deleted: false,
                })
                .select('fullName');

            chat.infoUser = user;
        }
    }

    res.render('client/pages/chat/index.pug', {
        pageTitle: 'Chat',
        chats: chats,
    });
};

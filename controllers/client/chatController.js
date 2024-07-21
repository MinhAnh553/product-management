const chatModel = require('../../models/chatModel');
const userModel = require('../../models/userModel');
const chatSocket = require('../../sockets/client/chatSocket');

// [GET] /chat
module.exports.index = async (req, res) => {
    // Socket
    chatSocket(res);

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

const chatModel = require('../../models/chatModel');
const uploadCloudHelper = require('../../helpers/uploadCloudHelper');

module.exports = async (res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    _io.once('connection', (socket) => {
        socket.on('CLIENT_SEND_MESSAGE', async (data) => {
            let images = [];

            for (const buffer of data.images) {
                const link = await uploadCloudHelper(buffer);
                images.push(link);
            }
            const chat = new chatModel({
                user_id: userId,
                content: data.content,
                images: images,
            });
            await chat.save();

            // Return MESSAGE
            _io.emit('SERVER_RETURN_MESSAGE', {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images,
            });
        });

        socket.on('CLIENT_SEND_TYPING', (type) => {
            socket.broadcast.emit('SERVER_RETURN_TYPING', {
                userId: userId,
                fullName: fullName,
                type: type,
            });
        });
    });
};

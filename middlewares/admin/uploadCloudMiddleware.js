const uploadCloudHelper = require('../../helpers/uploadCloudHelper');

module.exports.uploadCloud = async (req, res, next) => {
    if (req.file) {
        req.body[req.file.fieldname] = await uploadCloudHelper(req.file.buffer);
    }
    next();
};

const md5 = require('md5');
const system = require('../../config/system');
const accountModel = require('../../models/accountModel');

module.exports.index = (req, res) => {
    res.render('admin/pages/my-account/index', {
        pageTitle: 'Thông tin tài khoản',
    });
};

module.exports.editPage = (req, res) => {
    res.render('admin/pages/my-account/edit', {
        pageTitle: 'Thông tin tài khoản',
    });
};

module.exports.edit = async (req, res) => {
    const id = res.locals.user.id;
    const data = req.body;

    const emailExit = await accountModel.findOne({
        _id: { $ne: id },
        email: data.email,
        deleted: false,
    });

    if (emailExit) {
        req.flash('error', `Email ${data.email} đã tồn tại!`);
    } else {
        if (data.password == '') {
            delete data.password;
        } else {
            data.password = md5(data.password);
        }

        await accountModel.updateOne(
            {
                _id: id,
            },
            data
        );

        req.flash('success', 'Cập nhật thành công!');
    }

    res.redirect('back');
};

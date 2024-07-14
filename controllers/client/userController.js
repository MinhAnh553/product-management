const userModel = require('../../models/userModel');
const md5 = require('md5');

// [GET] /user/register
module.exports.registerPage = (req, res) => {
    res.render('client/pages/user/register.pug', {
        pageTitle: 'Đăng ký tài khoản',
    });
};

// [POST] /user/register
module.exports.registerUser = async (req, res) => {
    const data = req.body;

    const emailExits = await userModel.findOne({
        email: data.email,
    });

    if (emailExits) {
        req.flash('error', 'Email đã tồn tại!');
        return;
    } else {
        data.password = md5(data.password);
        const account = new userModel(data);
        await account.save();

        res.cookie('tokenUser', account.tokenUser);

        req.flash('success', 'Tạo tài khoản thành công!');
        res.redirect('/');
    }
};

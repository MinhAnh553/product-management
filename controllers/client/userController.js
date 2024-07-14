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

// [GET] /user/login
module.exports.loginPage = (req, res) => {
    res.render('client/pages/user/login.pug', {
        pageTitle: 'Đăng nhập',
    });
};

// [POST] /user/login
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
    });
    if (!user) {
        req.flash('error', 'Email không tồn tại!');
        res.redirect('back');
    } else if (user.password == md5(password)) {
        res.cookie('tokenUser', user.tokenUser);

        req.flash('success', 'Đăng nhập thành công!');
        res.redirect('/');
    } else {
        req.flash('error', 'Mật khẩu không đúng!');
        res.redirect('back');
    }
};

// [GET] /user/logout
module.exports.logoutUser = (req, res) => {
    res.clearCookie('tokenUser');
    res.redirect('/user/login');
};

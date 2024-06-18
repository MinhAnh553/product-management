const md5 = require('md5');
const accountModel = require('../../models/accountModel');
const system = require('../../config/system');

// [GET] /admin/auth/login
module.exports.pageLogin = (req, res) => {
    res.render('admin/pages/auth/login', {
        pageTitle: 'Trang đăng nhập',
    });
};

// [POST] /admin/auth/login
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const account = await accountModel.findOne({
        email: email,
        status: 'active',
        deleted: false,
    });

    if (account) {
        if (account.status == 'inactive') {
            req.flash('error', 'Tài khoản đã bị khóa!');
            res.redirect('back');
        }
        if (md5(password) == account.password) {
            res.cookie('token', account.token);
            req.flash('success', 'Đăng nhập thành công!');
            res.redirect(`${system.prefixAdmin}/dashboard`);
        } else {
            req.flash('error', 'Mật khẩu không chính xác!');
            res.redirect('back');
        }
    } else {
        req.flash('error', 'Email không tồn tại!');
        res.redirect('back');
    }
};

// [GET] /admin/auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie('token');
    req.flash('success', 'Đăng xuất thành công!');
    res.redirect(`${system.prefixAdmin}/auth/login`);
};

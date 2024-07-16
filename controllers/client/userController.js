const userModel = require('../../models/userModel');
const forgotPasswordModel = require('../../models/forgotPasswordModel');
const md5 = require('md5');
const generateHelper = require('../../helpers/generate');
const sendMail = require('../../helpers/sendMail');
const cartModel = require('../../models/cartModel');

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
        status: 'active',
        deleted: false,
    });
    if (!user) {
        req.flash('error', 'Email không tồn tại!');
        res.redirect('back');
    } else if (user.password == md5(password)) {
        res.cookie('tokenUser', user.tokenUser);

        await cartModel.updateOne(
            {
                _id: req.cookies.cartId,
            },
            {
                user_id: user.id,
            }
        );

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

// [GET] /user/password/forgot
module.exports.forgotPasswordPage = (req, res) => {
    const email = req.query.email;
    res.render('client/pages/user/forgot-password.pug', {
        pageTitle: 'Quên mật khẩu',
        email: email,
    });
};

// [POST] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    const user = await userModel.findOne({
        email: email,
        status: 'active',
        deleted: false,
    });

    if (user) {
        const otp = generateHelper.number(6);
        const forgotPassword = new forgotPasswordModel({
            email: email,
            otp: otp,
            expireAt: Date.now(),
        });

        await forgotPassword.save();

        const html = `<b>Có ai đó vừa yêu cầu gửi OTP khôi phục bằng Email này, nếu là bạn thì OTP bên dưới dùng để xác thực thay đổi<br></br>OTP: <span style="color:blue;font-size:20px"><b>${otp}</b></span></b>`;

        sendMail(email, 'KHÔI PHỤC MẬT KHẨU', html);

        req.flash(
            'succes',
            'Vui lòng kiểm tra email của bạn để nhận mã xác nhận!'
        );
        res.redirect(`/user/password/otp?email=${email}`);
    } else {
        req.flash('error', 'Email không tồn tại!');
        res.redirect('back');
    }
};

// [GET] /user/password/otp
module.exports.otpPasswordPage = (req, res) => {
    const email = req.query.email;
    if (!email) {
        res.redirect('/user/login');
        return;
    }
    res.render('client/pages/user/otp-password.pug', {
        pageTitle: 'Quên mật khẩu',
        email: email,
    });
};

// [POST] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const { email, otp } = req.body;

    const record = await forgotPasswordModel.findOne({
        email: email,
    });

    if (!record) {
        req.flash('error', 'Mã OTP đã hết hạn, vui lòng gửi lại!');
        res.redirect(`/user/password/forgot?email=${email}`);
        return;
    }

    const result = await forgotPasswordModel.findOne({
        email: email,
        otp: otp,
    });

    if (result) {
        const user = await userModel.findOne({
            email: email,
            status: 'active',
            deleted: false,
        });

        res.cookie('tokenUser', user.tokenUser);

        res.redirect(`/user/password/reset`);
    } else {
        req.flash('error', 'Mã OTP không đúng!');
        res.redirect('back');
    }
};

// [GET] /user/password/reset
module.exports.resetPasswordPage = (req, res) => {
    if (!req.cookies.tokenUser) {
        res.redirect('/user/login');
        return;
    }

    res.render('client/pages/user/reset-password.pug', {
        pageTitle: 'Đổi mật khẩu',
    });
};

// [POST] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    const password = req.body.password;

    await userModel.updateOne(
        {
            tokenUser: req.cookies.tokenUser,
        },
        {
            password: md5(password),
        }
    );

    req.flash('success', 'Đổi mật khẩu thành công!');
    res.redirect('/');
};

// [GET] /user/user-info
module.exports.userInfo = async (req, res) => {
    res.render('client/pages/user/user-info.pug', {
        pageTitle: 'Thông tin tài khoản',
    });
};

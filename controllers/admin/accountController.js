const md5 = require('md5');
const system = require('../../config/system');

const roleModel = require('../../models/roleModel');
const accountModel = require('../../models/accountModel');

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    const accounts = await accountModel
        .find({
            deleted: false,
        })
        .select('-password -token');

    for (const account of accounts) {
        const role = await roleModel.findOne({
            _id: account.role_id,
            deleted: false,
        });
        account.role = role;
    }

    res.render('admin/pages/account/index', {
        pageTitle: 'Trang quản lý tài khoản',
        accounts: accounts,
    });
};

// [GET] /admin/accounts/createPage
module.exports.createPage = async (req, res) => {
    const roles = await roleModel.find({
        deleted: false,
    });

    res.render('admin/pages/account/create', {
        pageTitle: 'Thêm mới tài khoản',
        roles: roles,
    });
};

// [POST] /admin/accounts/createAccount
module.exports.createAccount = async (req, res) => {
    const accountExits = await accountModel.findOne({
        email: req.body.email,
    });
    if (accountExits) {
        req.flash('error', 'Email đã tồn tại!');
        res.redirect('back');
    } else {
        req.body.password = md5(req.body.password);
        const account = new accountModel(req.body);

        await account.save();

        res.redirect(`${system.prefixAdmin}/accounts`);
    }
};

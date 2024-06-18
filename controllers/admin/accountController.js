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

// [GET] /admin/accounts/editPage
module.exports.editPage = async (req, res) => {
    try {
        const id = req.params.id;
        const account = await accountModel.findOne({
            _id: id,
            deleted: false,
        });
        const roles = await roleModel.find({
            deleted: false,
        });

        res.render('admin/pages/account/edit', {
            pageTitle: 'Chỉnh sửa tài khoản',
            roles: roles,
            account: account,
        });
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/accounts`);
    }
};

// [PATCH] /admin/accounts/editAccount
module.exports.editAccount = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    console.log('MinhAnh553: module.exports.editAccount -> data', data);
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

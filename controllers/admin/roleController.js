const roleModel = require('../../models/roleModel');
const system = require('../../config/system.js');

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    };

    const roles = await roleModel.find(find);

    res.render('admin/pages/role/index', {
        pageTitle: 'Trang nhóm quyền',
        records: roles,
    });
};

// [GET] /admin/roles/create
module.exports.pageCreate = async (req, res) => {
    res.render('admin/pages/role/create', {
        pageTitle: 'Trang tạo nhóm quyền',
    });
};

// [POST] /admin/roles/create
module.exports.create = async (req, res) => {
    const data = req.body;
    const role = new roleModel(req.body);
    await role.save();

    req.flash('success', 'Tạo nhóm quyền thành công!');
    res.redirect(`${system.prefixAdmin}/roles`);
};

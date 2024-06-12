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
    try {
        const data = req.body;
        const role = new roleModel(req.body);
        await role.save();

        req.flash('success', 'Tạo nhóm quyền thành công!');
        res.redirect(`${system.prefixAdmin}/roles`);
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/roles`);
    }
};

// [GET] /admin/roles/edit:id
module.exports.pageEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await roleModel.findOne({
            _id: id,
        });
        res.render('admin/pages/role/edit', {
            pageTitle: 'Trang chỉnh sửa',
            data: role,
        });
    } catch (error) {
        res.redirect(`${system.prefixAdmin}/roles`);
    }
};

// [PATCH] /admin/roles/edit:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await roleModel.updateOne(
            {
                _id: id,
            },
            data
        );
        req.flash('success', 'Cập nhật thành công!');
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại!');
    }
    res.redirect('back');
};

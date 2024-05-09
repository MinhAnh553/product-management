const Product = require('../../models/product.model');

// [GET] /admin/product
module.exports.index = async (req, res) => {
    let filterButton = [
        {
            name: 'Tất cả',
            class: '',
            status: '',
        },
        {
            name: 'Hoạt động',
            class: '',
            status: 'active',
        },
        {
            name: 'Dừng hoạt động',
            class: '',
            status: 'inactive',
        },
    ];

    const filterValue = req.query.status;

    let find = {
        deleted: false,
    };

    if (filterValue) {
        find.status = filterValue;
        const indexStatus = filterButton.findIndex(
            (item) => item.status == filterValue
        );
        filterButton[indexStatus].class = 'active';
    } else {
        const indexStatus = filterButton.findIndex((item) => item.status == '');
        filterButton[0].class = 'active';
    }

    const products = await Product.find(find);

    res.render('admin/pages/product/index.pug', {
        pageTitle: 'Trang sản phẩm',
        products: products,
        filterButton: filterButton,
    });
};

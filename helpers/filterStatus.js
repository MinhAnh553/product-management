module.exports = (req) => {
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

    if (req.query.status) {
        const indexStatus = filterButton.findIndex(
            (item) => item.status == req.query.status
        );
        filterButton[indexStatus].class = 'active';
    } else {
        const indexStatus = filterButton.findIndex((item) => item.status == '');
        filterButton[0].class = 'active';
    }

    return filterButton;
};

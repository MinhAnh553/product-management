const tableChangePermissions = document.querySelector(
    '[table-change-permissions]'
);
if (tableChangePermissions) {
    const butonSubmit = document.querySelector('[button-submit]');
    butonSubmit.addEventListener('click', () => {
        let permissions = [];
        const rows = tableChangePermissions.querySelectorAll('[data-name]');
        rows.forEach((row) => {
            const name = row.getAttribute('data-name');
            const inputs = row.querySelectorAll('input');

            if (row.getAttribute('data-name') == 'id') {
                inputs.forEach((input) => {
                    permissions.push({
                        id: input.value,
                        permissions: [],
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    if (input.checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });

        if (permissions.length > 0) {
            const formChangePermissions = document.querySelector(
                '#form-change-permissions'
            );
            if (formChangePermissions) {
                formChangePermissions.querySelector(
                    'input[name="permissions"]'
                ).value = JSON.stringify(permissions);

                formChangePermissions.submit();
            }
        }
    });
}

// Hiển thị
const dataRecords = document.querySelector('[data-view]');
if (dataRecords) {
    const data = JSON.parse(dataRecords.getAttribute('data-view'));

    data.forEach((item, index) => {
        const permissions = item.permissions;

        permissions.forEach((permission) => {
            const row = tableChangePermissions.querySelector(
                `[data-name=${permission}]`
            );
            const input = row.querySelectorAll('input')[index];

            input.checked = true;
        });
    });
}

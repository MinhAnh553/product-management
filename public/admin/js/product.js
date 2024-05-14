// Change status
const buttonChangeStatus = document.querySelectorAll('[button-change-status]');
if (buttonChangeStatus) {
    buttonChangeStatus.forEach((button) => {
        button.addEventListener('click', () => {
            const statusChange = button.getAttribute('data-change-status');
            const id = button.getAttribute('data-id');
            const formChangeStatus = document.querySelector(
                '#form-change-status'
            );
            const path = formChangeStatus.getAttribute('data-path');

            formChangeStatus.action =
                path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.submit();
        });
    });
}

// Delete-item
const buttonDeleteItem = document.querySelectorAll('[button-delete-item]');
if (buttonDeleteItem) {
    buttonDeleteItem.forEach((button) => {
        button.addEventListener('click', () => {
            const isConfirm = confirm(
                'Bạn có chắc chắn muốn xóa sản phẩm này?'
            );
            if (isConfirm) {
                const id = button.getAttribute('data-id');
                const formDeleteItem =
                    document.querySelector('#form-delete-item');
                const path = formDeleteItem.getAttribute('data-path');

                formDeleteItem.action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.submit();
            }
        });
    });
}

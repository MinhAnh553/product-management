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

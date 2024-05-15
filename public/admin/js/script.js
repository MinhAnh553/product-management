// Filter
const filterButton = document.querySelectorAll('[button-status]');

if (filterButton.length > 0) {
    let url = new URL(window.location.href);
    filterButton.forEach((button) => {
        button.addEventListener('click', () => {
            buttonStatus = button.getAttribute('button-status');
            if (buttonStatus) {
                url.searchParams.set('status', buttonStatus);
            } else {
                url.searchParams.delete('status');
            }
            window.location.href = url.href;
        });
    });
}

// Search
const formSearch = document.querySelector('#form-search');
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = e.target.keyword.value;
        if (keyword) {
            url.searchParams.set('keyword', keyword);
        } else {
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    });
}

// Pagination
const buttonPagination = document.querySelectorAll('[button-pagination]');
if (buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach((button) => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url.href;
        });
    });
}

// CheckBox All
const checkBoxMulti = document.querySelector('[checkbox-multi]');
if (checkBoxMulti) {
    const inputAll = checkBoxMulti.querySelector("input[name='checkall']");
    const inputsId = checkBoxMulti.querySelectorAll("input[name='id']");

    inputAll.addEventListener('click', () => {
        if (inputAll.checked) {
            inputsId.forEach((input) => {
                input.checked = true;
            });
        } else {
            inputsId.forEach((input) => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach((input) => {
        input.addEventListener('click', () => {
            const countChecked = checkBoxMulti.querySelectorAll(
                "input[name='id']:checked"
            ).length;

            if (inputsId.length == countChecked) {
                inputAll.checked = true;
            } else {
                inputAll.checked = false;
            }
        });
    });
}

// Form Change Multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault();

        const checkBoxMulti = document.querySelector('[checkbox-multi]');
        const inputsChecked = checkBoxMulti.querySelectorAll(
            "input[name='id']:checked"
        );

        if (inputsChecked.length > 0) {
            const type = e.target.elements.type.value;
            if (type == '') {
                alert('Vui lòng chọn hành động !');
                return;
            } else if (type == 'delete') {
                const isConfirm = confirm(
                    'Bạn có chắc chắn muốn xóa những sản phẩm này?'
                );
                if (!isConfirm) {
                    return;
                }
            }

            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach((input) => {
                const id = input.value;
                ids.push(id);
            });
            inputIds.value = ids.join(', ');
            formChangeMulti.submit();
        } else {
            alert('Vui lòng chọn ít nhất 1 sản phẩm !');
        }
    });
}

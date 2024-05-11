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

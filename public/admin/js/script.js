// Filter
const filterButton = document.querySelectorAll('[button-status]');
const url = new URL(window.location.href);

if (filterButton.length > 0) {
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

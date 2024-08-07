// Show alert
const showAlert = document.querySelector('[show-alert]');
if (showAlert) {
    const time = parseInt(showAlert.getAttribute('data-time'));
    const close = showAlert.querySelector('[close-alert]');

    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    close.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden');
    });
}

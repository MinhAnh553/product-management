// Add friend
const btnAddFriend = document.querySelectorAll('[btn-add-friend]');
if (btnAddFriend) {
    btnAddFriend.forEach((button) => {
        button.addEventListener('click', () => {
            const idFriend = button.getAttribute('btn-add-friend');

            button.closest('.box-user').classList.add('add');

            // Socket
            socket.emit('CLIENT_ADD_FRIEND', idFriend);
        });
    });
}

// Cancel friend
const btnCancelFriend = document.querySelectorAll('[btn-cancel-friend]');
if (btnCancelFriend) {
    btnCancelFriend.forEach((button) => {
        button.addEventListener('click', () => {
            const idFriend = button.getAttribute('btn-cancel-friend');

            button.closest('.box-user').classList.remove('add');

            // Socket
            socket.emit('CLIENT_CANCEL_FRIEND', idFriend);
        });
    });
}

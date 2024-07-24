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

// Refuse friend
const btnRefuseFriend = document.querySelectorAll('[btn-refuse-friend]');
if (btnRefuseFriend) {
    btnRefuseFriend.forEach((button) => {
        button.addEventListener('click', () => {
            const idFriend = button.getAttribute('btn-refuse-friend');

            button.closest('.box-user').classList.add('refuse');

            // Socket
            socket.emit('CLIENT_REFUSE_FRIEND', idFriend);
        });
    });
}

// Accepted friend
const btnAcceptFriend = document.querySelectorAll('[btn-accept-friend]');
if (btnAcceptFriend) {
    btnAcceptFriend.forEach((button) => {
        button.addEventListener('click', () => {
            const idFriend = button.getAttribute('btn-accept-friend');

            button.closest('.box-user').classList.add('accepted');

            // Socket
            socket.emit('CLIENT_ACCEPT_FRIEND', idFriend);
        });
    });
}

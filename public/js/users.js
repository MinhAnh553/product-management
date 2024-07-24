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

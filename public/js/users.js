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

// SERVER_RETURN_USER_ACCEPT
socket.on('SERVER_RETURN_USER_ACCEPT', (data) => {
    const badgeUsersAccept = document.querySelector('[badge-users-accept]');
    if (badgeUsersAccept) {
        const userId = badgeUsersAccept.getAttribute('badge-users-accept');
        if (userId == data.user_id) {
            badgeUsersAccept.innerHTML = data.listAcceptLength;

            // Page accept
            const userRequest = data.userRequest;
            const listUserAccept = document.querySelector('[list-user-accept]');
            if (listUserAccept && data.type == 'add') {
                const div = document.createElement('div');
                div.classList.add('col-6');
                div.setAttribute('user-id', userRequest._id);
                div.innerHTML = `
                    <div class="box-user">
                        <div class="inner-avatar">
                            <img
                                src=${userRequest.avatar} ? ${userRequest.avatar} : "/images/avatar.png"
                                alt=${userRequest.avatar}
                            />
                        </div>
                        <div class="inner-info">
                            <div class="inner-name">${userRequest.fullName}</div>
                            <div class="inner-buttons">
                                <button
                                    class="btn btn-sm btn-primary mx-1"
                                    btn-accept-friend=${userRequest._id}
                                >
                                    Chấp nhận</button
                                ><button
                                    class="btn btn-sm btn-secondary mx-1"
                                    btn-refuse-friend=${userRequest._id}
                                >
                                    Xóa</button
                                ><button
                                    class="btn btn-sm btn-secondary mx-1"
                                    btn-deleted-friend=""
                                    disabled=""
                                >
                                    Đã xóa</button
                                ><button
                                    class="btn btn-sm btn-secondary mx-1"
                                    btn-accepted-friend=""
                                    disabled=""
                                >
                                    Đã chấp nhận
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                listUserAccept.appendChild(div);

                // Refuse friend
                const btnRefuseFriend = div.querySelector(
                    '[btn-refuse-friend]'
                );
                if (btnRefuseFriend) {
                    btnRefuseFriend.addEventListener('click', () => {
                        const idFriend =
                            btnRefuseFriend.getAttribute('btn-refuse-friend');

                        btnRefuseFriend
                            .closest('.box-user')
                            .classList.add('refuse');

                        // Socket
                        socket.emit('CLIENT_REFUSE_FRIEND', idFriend);
                    });
                }

                // Accepted friend
                const btnAcceptFriend = div.querySelector(
                    '[btn-accept-friend]'
                );
                if (btnAcceptFriend) {
                    btnAcceptFriend.addEventListener('click', () => {
                        const idFriend =
                            btnAcceptFriend.getAttribute('btn-accept-friend');

                        btnAcceptFriend
                            .closest('.box-user')
                            .classList.add('accepted');

                        // Socket
                        socket.emit('CLIENT_ACCEPT_FRIEND', idFriend);
                    });
                }
            }
            if (listUserAccept && data.type == 'cancel') {
                const boxUser = listUserAccept.querySelector(
                    `[user-id='${userRequest._id}']`
                );
                listUserAccept.removeChild(boxUser);
            }

            // Page not-friend
            const listUserNotFriend = document.querySelector(
                '[list-user-not-friend]'
            );
            if (listUserNotFriend && data.type == 'add') {
                const boxUser = listUserNotFriend.querySelector(
                    `[user-id="${userRequest._id}"]`
                );
                listUserNotFriend.removeChild(boxUser);
            }
        }
    }
});

// SERVER_RETURN_USER_STATUS
socket.on('SERVER_RETURN_USER_STATUS', (data) => {
    const listFriend = document.querySelector('[list-friend]');
    if (listFriend) {
        const boxUser = listFriend.querySelector(`[user-id="${data.user_id}"]`);
        if (boxUser) {
            boxUser
                .querySelector('[status]')
                .setAttribute('status', data.status);
        }
    }
});

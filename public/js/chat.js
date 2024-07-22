import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';

// FileUploadWithPreview
const upload = new FileUploadWithPreview.FileUploadWithPreview('my-upload', {
    multiple: true,
    maxFileCount: 6,
});

// Funtion
var timeOutTyping;
const showTyping = () => {
    socket.emit('CLIENT_SEND_TYPING', 'show');
    clearTimeout(timeOutTyping);
    timeOutTyping = setTimeout(() => {
        socket.emit('CLIENT_SEND_TYPING', 'hidden');
    }, 2500);
};

// CLIENT_SEND_MESSAGE
const formMessage = document.querySelector('.chat .inner-form');
if (formMessage) {
    formMessage.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = e.target.elements.content.value;
        const images = upload.cachedFileArray || [];
        if (message != '' || images.length > 0) {
            socket.emit('CLIENT_SEND_MESSAGE', {
                content: message,
                images: images,
            });
            e.target.elements.content.value = '';
            upload.resetPreviewPanel();
            socket.emit('CLIENT_SEND_TYPING', 'hidden');
        }
    });
}

// SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MESSAGE', (data) => {
    const body = document.querySelector('.inner-body');
    const myId = body.getAttribute('my-id');
    const listTyping = document.querySelector('.chat .inner-list-typing');
    const div = document.createElement('div');

    let htmlFullName = '';
    if (myId == data.userId) {
        div.classList.add('inner-outgoing');
    } else {
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
        div.classList.add('inner-incoming');
    }

    let htmlContent = '';
    if (data.content) {
        htmlContent = `
            <div class="inner-content">${data.content}</div>
        `;
    }

    let htmlImage = '';
    if (data.images) {
        htmlImage = `<div class="inner-images">`;
        for (const image of data.images) {
            htmlImage += `<img src="${image}"/>`;
        }
        htmlImage += '</div>';
    }

    div.innerHTML = `
        ${htmlFullName}
        ${htmlContent}
        ${htmlImage}
    `;
    body.insertBefore(div, listTyping);
    div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // View an image
    const viewer = new Viewer(div);
});

// Scroll chat to bottom
const bodyChat = document.querySelector('.inner-body');
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
    // View an image
    const viewer = new Viewer(bodyChat);
}

// emoji-picker
const tooltip = document.querySelector('.tooltip');
const buttonIcon = document.querySelector('.chat .inner-form .button-icon');
if (buttonIcon && tooltip) {
    Popper.createPopper(buttonIcon, tooltip);
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown');
    };
}

const inputContent = document.querySelector(
    ".chat .inner-form input[name='content']"
);
if (inputContent) {
    // chèn emoji-picker
    const emojiPicker = document.querySelector('emoji-picker');
    emojiPicker.addEventListener('emoji-click', (e) => {
        const emoji = e.detail.unicode;

        inputContent.value += emoji;
        showTyping();

        const positon = inputContent.value.length;
        inputContent.focus();
        inputContent.setSelectionRange(positon, positon);
    });

    // typing
    inputContent.addEventListener('keyup', (e) => {
        showTyping();
    });

    // SERVER_RETURN_TYPING
    socket.on('SERVER_RETURN_TYPING', (data) => {
        const listTyping = document.querySelector('.chat .inner-list-typing');
        const userTyping = document.querySelector(
            `[user-typing="${data.userId}"]`
        );
        if (!userTyping && data.type == 'show') {
            const div = document.createElement('div');
            const html = `
            <div class="inner-name">${data.fullName}</div>
            <div class="inner-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

            div.classList.add('box-typing');
            div.setAttribute('user-typing', data.userId);
            div.innerHTML = html;
            listTyping.appendChild(div);
            bodyChat.scrollTop = bodyChat.scrollHeight;
        } else if (data.type == 'hidden') {
            listTyping.removeChild(userTyping);
        }
    });
}

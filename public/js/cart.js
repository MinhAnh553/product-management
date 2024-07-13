// Update quantity
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if (inputQuantity.length > 0) {
    inputQuantity.forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.getAttribute('item-id');
            const quantity = input.value;

            if (quantity > 0) {
                window.location.href = `/cart/update/${productId}/${quantity}`;
            }
        });
    });
}

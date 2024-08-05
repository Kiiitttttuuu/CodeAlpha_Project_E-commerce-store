document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/cart')
        .then(response => response.json())
        .then(cart => {
            const cartContainer = document.getElementById('cart');
            if (cart.products.length === 0) {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            cart.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                `;
                cartContainer.appendChild(productDiv);
            });
        });
});
